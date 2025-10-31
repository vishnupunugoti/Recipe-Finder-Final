import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavorites, toggleFavorite, likeRecipe } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedRecipes, setLikedRecipes] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [isAuthenticated, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (recipeId) => {
    try {
      const result = await likeRecipe(recipeId);
      setFavorites(prev =>
        prev.map(recipe =>
          recipe._id === recipeId
            ? {
                ...recipe,
                likes: result.isLiked
                  ? [...(recipe.likes || []), recipeId]
                  : recipe.likes.filter(id => id !== recipeId),
              }
            : recipe
        )
      );
      if (result.isLiked) {
        setLikedRecipes(prev => new Set([...prev, recipeId]));
      } else {
        setLikedRecipes(prev => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  const handleFavorite = async (recipeId) => {
    try {
      const result = await toggleFavorite(recipeId);
      if (!result.isFavorite) {
        setFavorites(prev => prev.filter(recipe => recipe._id !== recipeId));
      }
    } catch (error) {
      console.error('Error favoriting recipe:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FaHeart className="text-red-500 text-3xl" />
            <h1 className="text-4xl font-bold text-gray-900">My Favorite Recipes</h1>
          </div>
          <p className="text-xl text-gray-600">
            Your saved recipes for easy access anytime
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <FaHeart className="text-gray-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 mb-8">
              Start exploring recipes and save your favorites for later!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary"
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              You have <span className="font-bold text-primary-600">{favorites.length}</span> favorite recipe{favorites.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onLike={() => handleLike(recipe._id)}
                  isLiked={likedRecipes.has(recipe._id) || (recipe.likes || []).some(like => like._id || like)}
                  onFavorite={() => handleFavorite(recipe._id)}
                  isFavorite={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;

