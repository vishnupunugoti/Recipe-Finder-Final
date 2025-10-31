import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaUsers, FaHeart, FaAward, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About SpiceTrail</h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            Your gateway to discovering authentic Indian recipes from various regional cuisines
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                SpiceTrail was created with a simple mission: to make authentic Indian recipes 
                accessible to everyone, everywhere. We believe that food is a universal language that 
                brings people together.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our platform celebrates the rich diversity of Indian cuisine, from the spicy curries 
                of the North to the flavorful dosas of the South, from street food favorites to 
                traditional home-cooked meals.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to preserving traditional recipes while making them easy to discover, 
                learn, and share with the global community.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8 h-full">
                <FaUtensils className="text-6xl text-primary-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Authentic Recipes</h3>
                <p className="text-gray-700">
                  Every recipe on our platform is carefully curated to ensure authenticity and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why Choose SpiceTrail?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Join thousands of food lovers sharing their favorite recipes and culinary experiences.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Top Rated Recipes</h3>
              <p className="text-gray-600">
                Discover the most loved and highest-rated recipes from our community of chefs and home cooks.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Save Your Favorites</h3>
              <p className="text-gray-600">
                Save your favorite recipes and create your personal cookbook for easy access anytime.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Regional Diversity</h3>
              <p className="text-gray-600">
                Explore recipes from North to South, East to West, covering all regional cuisines of India.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy to Follow</h3>
              <p className="text-gray-600">
                Step-by-step instructions with detailed ingredients list make cooking easy and enjoyable.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Share & Connect</h3>
              <p className="text-gray-600">
                Share your recipes, rate and review dishes, and connect with fellow food enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-primary-100">Recipes</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Categories</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">8</div>
              <div className="text-primary-100">Regional Cuisines</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Cooking?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and start exploring amazing Indian recipes today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary inline-block">
              Sign Up Free
            </Link>
            <Link to="/home" className="btn-secondary inline-block">
              Explore Recipes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

