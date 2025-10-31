const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Recipe = require('../models/Recipe');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', [
  auth,
  body('recipe').notEmpty().withMessage('Recipe ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipe, rating, comment } = req.body;

    // Check if recipe exists
    const recipeDoc = await Recipe.findById(recipe);
    if (!recipeDoc) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user already reviewed
    let review = await Review.findOne({ recipe, user: req.user._id });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      // Create new review
      review = new Review({ recipe, user: req.user._id, rating, comment });
      await review.save();
    }

    // Update recipe average rating
    const reviews = await Review.find({ recipe });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Recipe.findByIdAndUpdate(recipe, {
      averageRating: averageRating.toFixed(1),
      totalRatings: reviews.length
    });

    await review.populate('user', 'name profilePhoto');

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/recipe/:recipeId
// @desc    Get reviews for a recipe
// @access  Public
router.get('/recipe/:recipeId', async (req, res) => {
  try {
    const reviews = await Review.find({ recipe: req.params.recipeId })
      .populate('user', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is the author
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const recipeId = review.recipe;
    await Review.findByIdAndDelete(req.params.id);

    // Update recipe average rating
    const reviews = await Review.find({ recipe: recipeId });
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    
    await Recipe.findByIdAndUpdate(recipeId, {
      averageRating: averageRating.toFixed(1),
      totalRatings: reviews.length
    });

    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

