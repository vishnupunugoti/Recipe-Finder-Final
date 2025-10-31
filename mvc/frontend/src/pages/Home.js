import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecipes, toggleFavorite, likeRecipe } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import Modal from '../components/Modal';
import { FaFilter, FaTimes, FaSearch, FaSpinner } from 'react-icons/fa';

const categories = ['All', 'North Indian', 'South Indian', 'Gujarati', 'Bengali', 'Punjabi', 'Rajasthani', 'Street Food', 'Other'];
const regions = ['All', 'Punjab', 'Karnataka', 'Gujarat', 'West Bengal', 'Rajasthan', 'Maharashtra', 'Tamil Nadu', 'Hyderabad', 'Delhi'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'likes', label: 'Most Liked' },
];

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    region: 'All',
    difficulty: 'All',
    search: searchParams.get('search') || '',
    sort: 'newest',
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [previewRecipe, setPreviewRecipe] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState(new Set());
  const [favoriteRecipes, setFavoriteRecipes] = useState(new Set());

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== filters.search) {
        setFilters(prev => ({ ...prev, search: searchQuery }));
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, filters.search]);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        sort: filters.sort,
      };

      if (filters.category !== 'All') params.category = filters.category;
      if (filters.region !== 'All') params.region = filters.region;
      if (filters.difficulty !== 'All') params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;

      const data = await getRecipes(params);
      
      if (page === 1) {
        setRecipes(data.recipes);
      } else {
        setRecipes(prev => [...prev, ...data.recipes]);
      }
      
      setTotalPages(data.totalPages);
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
    setIsFilterOpen(false);
  };

  const handleLike = async (recipeId) => {
    if (!isAuthenticated) {
      alert('Please login to like recipes');
      return;
    }

    try {
      const result = await likeRecipe(recipeId);
      setRecipes(prev =>
        prev.map(recipe =>
          recipe._id === recipeId
            ? {
                ...recipe,
                likes: result.isLiked
                  ? [...(recipe.likes || []), user._id]
                  : recipe.likes.filter(id => id !== user._id),
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
    if (!isAuthenticated) {
      alert('Please login to save favorites');
      return;
    }

    try {
      const result = await toggleFavorite(recipeId);
      if (result.isFavorite) {
        setFavoriteRecipes(prev => new Set([...prev, recipeId]));
      } else {
        setFavoriteRecipes(prev => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error favoriting recipe:', error);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Recipes</h1>
          <p className="text-xl text-gray-600">Explore our collection of authentic Indian recipes</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>

          {/* Active Filters */}
          {(filters.category !== 'All' || filters.region !== 'All' || filters.difficulty !== 'All' || filters.search) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.category !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  {filters.category}
                  <button
                    onClick={() => handleFilterChange('category', 'All')}
                    className="ml-2 hover:text-primary-600"
                  >
                    <FaTimes />
                  </button>
                </span>
              )}
              {filters.region !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  {filters.region}
                  <button
                    onClick={() => handleFilterChange('region', 'All')}
                    className="ml-2 hover:text-primary-600"
                  >
                    <FaTimes />
                  </button>
                </span>
              )}
              {filters.difficulty !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  {filters.difficulty}
                  <button
                    onClick={() => handleFilterChange('difficulty', 'All')}
                    className="ml-2 hover:text-primary-600"
                  >
                    <FaTimes />
                  </button>
                </span>
              )}
              {filters.search && (
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  Search: {filters.search}
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      handleFilterChange('search', '');
                    }}
                    className="ml-2 hover:text-primary-600"
                  >
                    <FaTimes />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Filter Modal */}
          {isFilterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Recipes Grid */}
        {loading && recipes.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-primary-600" />
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-4">No recipes found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onLike={() => handleLike(recipe._id)}
                  isLiked={likedRecipes.has(recipe._id) || (recipe.likes || []).some(like => like._id === user?._id || like === user?._id)}
                  onFavorite={() => handleFavorite(recipe._id)}
                  isFavorite={favoriteRecipes.has(recipe._id)}
                  showFavorite={isAuthenticated}
                />
              ))}
            </div>

            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Modal */}
      {previewRecipe && (
        <Modal
          isOpen={!!previewRecipe}
          onClose={() => setPreviewRecipe(null)}
          title={previewRecipe.title}
          size="lg"
        >
          <div className="space-y-4">
            <img
              src={previewRecipe.image || 'https://via.placeholder.com/600x400'}
              alt={previewRecipe.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-gray-600">{previewRecipe.description}</p>
            <Link
              to={`/recipe/${previewRecipe._id}`}
              className="btn-primary inline-block"
            >
              View Full Recipe
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;

