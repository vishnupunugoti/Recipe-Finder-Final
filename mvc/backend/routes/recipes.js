const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   GET /api/recipes
// @desc    Get all recipes with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, region, difficulty, search, sort, page = 1, limit = 12 } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (region) query.region = region;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = {};
    if (sort === 'rating') sortOption = { averageRating: -1 };
    else if (sort === 'likes') sortOption = { likes: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const recipes = await Recipe.find(query)
      .populate('author', 'name profilePhoto')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Recipe.countDocuments(query);

    res.json({
      recipes,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalRecipes: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/recipes/trending
// @desc    Get trending recipes
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'name profilePhoto')
      .sort({ averageRating: -1, likes: -1 })
      .limit(8);

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/recipes/top-rated
// @desc    Get top rated recipes
// @access  Public
router.get('/top-rated', async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'name profilePhoto')
      .sort({ averageRating: -1 })
      .limit(8);

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/recipes/most-liked
// @desc    Get most liked recipes
// @access  Public
router.get('/most-liked', async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'name profilePhoto')
      .sort({ likes: -1 })
      .limit(8);

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name profilePhoto')
      .populate('likes', 'name');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const reviews = await Review.find({ recipe: req.params.id })
      .populate('user', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.json({ recipe, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/recipes
// @desc    Create a new recipe
// @access  Private
router.post('/', [
  auth,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
  body('instructions').isArray({ min: 1 }).withMessage('At least one instruction is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const recipeData = {
      ...req.body,
      author: req.user._id
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();
    await recipe.populate('author', 'name profilePhoto');

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/recipes/:id
// @desc    Update a recipe
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is author
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('author', 'name profilePhoto');

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is author
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ recipe: req.params.id });

    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/recipes/:id/like
// @desc    Like/Unlike a recipe
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const isLiked = recipe.likes.some(like => like.toString() === req.user._id.toString());

    if (isLiked) {
      recipe.likes = recipe.likes.filter(like => like.toString() !== req.user._id.toString());
    } else {
      recipe.likes.push(req.user._id);
    }

    await recipe.save();
    res.json({ likes: recipe.likes.length, isLiked: !isLiked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

