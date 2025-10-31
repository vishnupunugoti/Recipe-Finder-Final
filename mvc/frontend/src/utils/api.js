import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Recipes API
export const getRecipes = async (params = {}) => {
  const response = await axios.get(`${API_URL}/recipes`, { params });
  return response.data;
};

export const getRecipe = async (id) => {
  const response = await axios.get(`${API_URL}/recipes/${id}`);
  return response.data;
};

export const getTrendingRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes/trending`);
  return response.data;
};

export const getTopRatedRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes/top-rated`);
  return response.data;
};

export const getMostLikedRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes/most-liked`);
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await axios.post(`${API_URL}/recipes`, recipeData);
  return response.data;
};

export const updateRecipe = async (id, recipeData) => {
  const response = await axios.put(`${API_URL}/recipes/${id}`, recipeData);
  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await axios.delete(`${API_URL}/recipes/${id}`);
  return response.data;
};

export const likeRecipe = async (id) => {
  const response = await axios.post(`${API_URL}/recipes/${id}/like`);
  return response.data;
};

// Reviews API
export const createReview = async (reviewData) => {
  const response = await axios.post(`${API_URL}/reviews`, reviewData);
  return response.data;
};

export const getRecipeReviews = async (recipeId) => {
  const response = await axios.get(`${API_URL}/reviews/recipe/${recipeId}`);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(`${API_URL}/reviews/${id}`);
  return response.data;
};

// Users API
export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/users/profile`, userData);
  return response.data;
};

export const getUserRecipes = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}/recipes`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await axios.get(`${API_URL}/users/favorites`);
  return response.data;
};

export const toggleFavorite = async (recipeId) => {
  const response = await axios.post(`${API_URL}/users/favorites/${recipeId}`);
  return response.data;
};

