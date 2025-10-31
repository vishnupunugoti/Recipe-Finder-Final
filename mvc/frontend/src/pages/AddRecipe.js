import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createRecipe } from '../utils/api';
import { FaPlus, FaTrash, FaChevronLeft } from 'react-icons/fa';

const AddRecipe = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'North Indian',
    region: '',
    difficulty: 'Medium',
    image: '',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [{ name: '', quantity: '' }],
    instructions: [{ step: 1, description: '' }],
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }],
    });
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index].description = value;
    newInstructions[index].step = index + 1;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { step: formData.instructions.length + 1, description: '' }],
    });
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions
        .filter((_, i) => i !== index)
        .map((inst, i) => ({ ...inst, step: i + 1 }));
      setFormData({ ...formData, instructions: newInstructions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      setLoading(false);
      return;
    }

    if (formData.ingredients.some(ing => !ing.name || !ing.quantity)) {
      setError('All ingredients must have a name and quantity');
      setLoading(false);
      return;
    }

    if (formData.instructions.some(inst => !inst.description)) {
      setError('All instructions must have a description');
      setLoading(false);
      return;
    }

    try {
      const recipe = await createRecipe(formData);
      navigate(`/recipe/${recipe._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['North Indian', 'South Indian', 'Gujarati', 'Bengali', 'Punjabi', 'Rajasthani', 'Street Food', 'Other'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <FaChevronLeft />
            <span>Back</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Add New Recipe</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Butter Chicken"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="Describe your recipe..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Region *</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., Punjab"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty *</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipe Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prep Time (min) *</label>
                  <input
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cook Time (min) *</label>
                  <input
                    type="number"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Servings *</label>
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-2xl font-bold text-gray-900">Ingredients *</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center space-x-2 btn-secondary"
                >
                  <FaPlus />
                  <span>Add Ingredient</span>
                </button>
              </div>

              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex space-x-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      required
                      className="input-field"
                      placeholder="Ingredient name"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      required
                      className="input-field"
                      placeholder="Quantity (e.g., 500g)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={formData.ingredients.length === 1}
                    className="p-3 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-2xl font-bold text-gray-900">Instructions *</h2>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="flex items-center space-x-2 btn-secondary"
                >
                  <FaPlus />
                  <span>Add Step</span>
                </button>
              </div>

              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex space-x-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {instruction.step || index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={instruction.description}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      required
                      rows="3"
                      className="input-field"
                      placeholder="Describe this step..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    disabled={formData.instructions.length === 1}
                    className="p-3 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Recipe...' : 'Create Recipe'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;

