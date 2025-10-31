import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, getUserRecipes } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import { FaUser, FaEdit, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', profilePhoto: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchUserRecipes();
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setFormData({ name: data.name, profilePhoto: data.profilePhoto || '' });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRecipes = async () => {
    try {
      const data = await getUserRecipes(user._id);
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const updatedProfile = await updateUserProfile(formData);
      setProfile(updatedProfile);
      updateUser(updatedProfile);
      setEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              {!editing ? (
                <>
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      {profile?.profilePhoto ? (
                        <img
                          src={profile.profilePhoto}
                          alt={profile.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary-500"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-primary-500 flex items-center justify-center mx-auto border-4 border-primary-500">
                          <FaUser className="text-white text-4xl" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">{profile?.name}</h2>
                    <p className="text-gray-600 mt-2">{profile?.email}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Member since</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(profile?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Favorite Recipes</p>
                      <p className="font-semibold text-gray-900">{profile?.favorites?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recipes Uploaded</p>
                      <p className="font-semibold text-gray-900">{recipes.length}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditing(true)}
                    className="w-full mt-6 btn-primary flex items-center justify-center space-x-2"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    {formData.profilePhoto ? (
                      <img
                        src={formData.profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary-500"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-primary-500 flex items-center justify-center mx-auto border-4 border-primary-500">
                        <FaUser className="text-white text-4xl" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Photo URL
                    </label>
                    <input
                      type="url"
                      name="profilePhoto"
                      value={formData.profilePhoto}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex-1">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setFormData({ name: profile.name, profilePhoto: profile.profilePhoto || '' });
                        setError('');
                        setSuccess('');
                      }}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* My Recipes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">My Recipes</h2>
                <button
                  onClick={() => navigate('/add-recipe')}
                  className="btn-primary"
                >
                  Add Recipe
                </button>
              </div>

              {recipes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">You haven't uploaded any recipes yet</p>
                  <button
                    onClick={() => navigate('/add-recipe')}
                    className="btn-primary"
                  >
                    Create Your First Recipe
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} showFavorite={false} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

