import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecipe, likeRecipe, createReview, deleteReview, toggleFavorite } from '../utils/api';
import { FaClock, FaUsers, FaStar, FaHeart, FaMapMarkerAlt, FaEdit, FaTrash, FaChevronRight, FaUser } from 'react-icons/fa';
import Modal from '../components/Modal';

const RecipeDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const data = await getRecipe(id);
      setRecipe(data.recipe);
      setReviews(data.reviews || []);
      
      if (user) {
        setIsLiked((data.recipe.likes || []).some(like => like._id === user._id || like === user._id));
        const review = data.reviews?.find(r => r.user._id === user._id || r.user === user._id);
        if (review) {
          setUserReview(review);
          setReviewForm({ rating: review.rating, comment: review.comment || '' });
        }
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like recipes');
      return;
    }

    try {
      const result = await likeRecipe(id);
      setIsLiked(result.isLiked);
      setRecipe(prev => ({
        ...prev,
        likes: result.isLiked
          ? [...(prev.likes || []), user._id]
          : prev.likes.filter(likeId => likeId !== user._id && likeId._id !== user._id)
      }));
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Please login to save favorites');
      return;
    }

    try {
      const result = await toggleFavorite(id);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error('Error favoriting recipe:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add reviews');
      return;
    }

    try {
      if (userReview) {
        // Update existing review
        await createReview({ recipe: id, rating: reviewForm.rating, comment: reviewForm.comment });
      } else {
        // Create new review
        await createReview({ recipe: id, rating: reviewForm.rating, comment: reviewForm.comment });
      }
      setShowReviewModal(false);
      fetchRecipe();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;

    try {
      await deleteReview(userReview._id);
      setUserReview(null);
      setReviewForm({ rating: 5, comment: '' });
      fetchRecipe();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <Link to="/home" className="btn-primary">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const isAuthor = user && (recipe.author._id === user._id || recipe.author === user._id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <FaChevronRight className="text-xs" />
          <Link to="/home" className="hover:text-primary-600">Recipes</Link>
          <FaChevronRight className="text-xs" />
          <span className="text-gray-900">{recipe.title}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Recipe Header */}
          <div className="relative">
            <img
              src={recipe.image || 'https://via.placeholder.com/1200x600'}
              alt={recipe.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              {isAuthenticated && (
                <button
                  onClick={handleFavorite}
                  className={`p-3 rounded-full backdrop-blur-sm ${
                    isFavorite ? 'bg-red-500/90' : 'bg-white/90'
                  } transition-colors`}
                >
                  <FaHeart className={isFavorite ? 'text-white fill-current' : 'text-gray-700'} size={20} />
                </button>
              )}
              {isAuthor && (
                <Link
                  to={`/edit-recipe/${id}`}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <FaEdit className="text-gray-700" size={20} />
                </Link>
              )}
            </div>
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full font-semibold">
                {recipe.category}
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center space-x-1">
                <FaMapMarkerAlt className="text-primary-600" />
                <span>{recipe.region}</span>
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Recipe Title and Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">{recipe.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {recipe.averageRating > 0 && (
                    <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg">
                      <FaStar className="text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">{recipe.averageRating.toFixed(1)}</span>
                      <span className="text-gray-600">({recipe.totalRatings})</span>
                    </div>
                  )}
                  {isAuthenticated && (
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaHeart className={isLiked ? 'fill-current' : ''} />
                      <span className="font-semibold">{recipe.likes?.length || 0}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <FaClock className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-600">Prep Time</p>
                  <p className="font-bold text-lg">{recipe.prepTime} min</p>
                </div>
                <div className="text-center">
                  <FaClock className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-600">Cook Time</p>
                  <p className="font-bold text-lg">{recipe.cookTime} min</p>
                </div>
                <div className="text-center">
                  <FaClock className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-600">Total Time</p>
                  <p className="font-bold text-lg">{totalTime} min</p>
                </div>
                <div className="text-center">
                  <FaUsers className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-600">Servings</p>
                  <p className="font-bold text-lg">{recipe.servings}</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{ingredient.name}</span>
                      <span className="text-gray-500 ml-auto">{ingredient.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Instructions</h2>
              <div className="space-y-4">
                {recipe.instructions?.map((instruction, index) => (
                  <div key={index} className="flex space-x-4 bg-gray-50 rounded-xl p-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {instruction.step || index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-grow">{instruction.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                {recipe.author?.profilePhoto ? (
                  <img
                    src={recipe.author.profilePhoto}
                    alt={recipe.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
                    <FaUser className="text-white text-xl" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Recipe by</p>
                  <p className="text-xl font-bold text-gray-900">{recipe.author?.name || 'Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Reviews ({reviews.length})
                </h2>
                {isAuthenticated && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="btn-primary"
                  >
                    {userReview ? 'Update Review' : 'Add Review'}
                  </button>
                )}
              </div>

              {reviews.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {review.user?.profilePhoto ? (
                            <img
                              src={review.user.profilePhoto}
                              alt={review.user.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                              <FaUser className="text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-900">{review.user?.name || 'Unknown'}</p>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`${
                                    i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                  size={14}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {user && (review.user._id === user._id || review.user === user._id) && (
                          <button
                            onClick={handleDeleteReview}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                      {review.comment && (
                        <p className="text-gray-700">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <Modal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          title={userReview ? 'Update Review' : 'Add Review'}
        >
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: i + 1 })}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`${
                        i < reviewForm.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                      size={32}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                rows="4"
                className="input-field"
                placeholder="Write your review..."
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary flex-1">
                {userReview ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RecipeDetails;

