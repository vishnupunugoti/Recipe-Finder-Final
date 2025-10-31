const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['North Indian', 'South Indian', 'Gujarati', 'Bengali', 'Punjabi', 'Rajasthani', 'Street Food', 'Other']
  },
  region: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }],
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  prepTime: {
    type: Number,
    required: true,
    default: 15
  },
  cookTime: {
    type: Number,
    required: true,
    default: 30
  },
  servings: {
    type: Number,
    default: 4
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp
recipeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);

