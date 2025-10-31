import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTrendingRecipes } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import { FaArrowRight, FaUtensils, FaFire, FaAward, FaHeart } from 'react-icons/fa';

const categories = [
  { name: 'North Indian', icon: '🍛', color: 'from-orange-500 to-red-600' },
  { name: 'South Indian', icon: '🥘', color: 'from-yellow-500 to-orange-600' },
  { name: 'Gujarati', icon: '🥗', color: 'from-green-500 to-emerald-600' },
  { name: 'Bengali', icon: '🦐', color: 'from-blue-500 to-indigo-600' },
  { name: 'Punjabi', icon: '🧈', color: 'from-amber-500 to-yellow-600' },
  { name: 'Rajasthani', icon: '🌶️', color: 'from-red-500 to-pink-600' },
  { name: 'Street Food', icon: '🌮', color: 'from-purple-500 to-pink-600' },
];

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const recipes = await getTrendingRecipes();
        setTrendingRecipes(recipes);
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
              Discover Authentic
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Indian Recipes
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Explore thousands of traditional recipes from North to South India. 
              Share your favorite dishes and connect with food lovers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/signup"
                    className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-700 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/home"
                  className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>Explore Recipes</span>
                  <FaArrowRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {isAuthenticated && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Regional Cuisines</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore recipes from different regions of India
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/home?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${category.color} text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Recipes */}
      {isAuthenticated && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                  <FaFire className="text-orange-500" />
                  <span>Trending Recipes</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Most popular recipes this week
                </p>
              </div>
              <Link
                to="/home"
                className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <span>View All</span>
                <FaArrowRight />
              </Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingRecipes.slice(0, 4).map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why SpiceTrail?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to discover, share, and enjoy authentic Indian recipes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1000+ Recipes</h3>
              <p className="text-gray-600">
                Explore a vast collection of authentic Indian recipes from various regional cuisines
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Top Rated</h3>
              <p className="text-gray-600">
                Discover the most loved and highest-rated recipes from our community
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Save Favorites</h3>
              <p className="text-gray-600">
                Save your favorite recipes and access them anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of food lovers and start exploring amazing recipes today
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Sign Up Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;

