import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUsers, FaStar, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const RecipeCard = ({ recipe, onLike, isLiked, onFavorite, isFavorite, showFavorite = true }) => {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="card group cursor-pointer h-full flex flex-col">
      <Link to={`/recipe/${recipe._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={recipe.image || 'https://via.placeholder.com/400x300'}
            alt={recipe.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            {recipe.averageRating > 0 && (
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1 text-sm">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold">{recipe.averageRating.toFixed(1)}</span>
              </div>
            )}
            {showFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onFavorite && onFavorite();
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <FaHeart className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'} />
              </button>
            )}
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {recipe.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/recipe/${recipe._id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FaClock className="text-primary-500" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaUsers className="text-primary-500" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-primary-500" />
            <span>{recipe.region}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {recipe.author?.profilePhoto ? (
              <img
                src={recipe.author.profilePhoto}
                alt={recipe.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {recipe.author?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-600">{recipe.author?.name || 'Unknown'}</span>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLike && onLike();
            }}
            className={`p-2 rounded-full transition-colors ${
              isLiked
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FaHeart className={isLiked ? 'fill-current' : ''} />
            <span className="ml-1 text-sm">{recipe.likes?.length || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

