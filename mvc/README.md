# SpiceTrail - MERN Stack Application

A complete professional full-stack SpiceTrail application built with the MERN stack (MongoDB, Express, React, Node.js). The app helps users discover, search, and manage various Indian recipes covering regional cuisines like North Indian, South Indian, Gujarati, Bengali, Punjabi, Rajasthani, and Street Foods.

## Features

### Frontend (React + Tailwind CSS)
- **Landing Page** - Hero section, cuisine categories, trending recipes, search bar
- **Home Page** - All recipes with advanced filtering (category, difficulty, region) and sorting
- **Recipe Details Page** - Full recipe info, ingredients, cooking steps, reviews, like & favorite options
- **Add Recipe Page** - Form for users to upload new recipes with images and ingredients
- **Profile Page** - User info, uploaded recipes, and favorites management
- **Favorites Page** - Saved favorite recipes
- **About & Contact Pages** - Brand information and contact form
- **Authentication** - Login/Signup pages with secure authentication

### Backend (Node.js + Express + MongoDB)
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- User management with profiles
- Recipe CRUD operations
- Review and rating system
- Like and favorite functionality
- Advanced search and filtering

### UI Features
- Professional Tailwind CSS styling
- Fully responsive design
- Interactive search with live suggestions
- Modal components for quick previews
- Category cards with hover animations
- Smooth transitions and animations
- Gradient backgrounds and modern design
- Professional typography

### Advanced Features
- Live search with debounce
- Real-time comments and ratings
- Top Rated and Most Liked sections
- Favorites functionality
- Infinite scroll / Load More pagination
- Recipe filtering by multiple criteria
- User profile management

## Tech Stack

### Frontend
- React 18.2.0 (without Vite)
- React Router DOM 6.15.0
- Tailwind CSS 3.3.3
- Axios for API calls
- React Icons

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 7.5.0
- JWT for authentication
- bcryptjs for password hashing
- Express Validator

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-finder
JWT_SECRET=your-secret-jwt-key-change-in-production
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# On Windows
# Make sure MongoDB service is running

# On macOS/Linux
mongod
```

5. Seed the database with sample recipes:
```bash
npm run seed
```

6. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
recipe-finder/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── recipes.js
│   │   ├── users.js
│   │   └── reviews.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── RecipeCard.js
│   │   │   └── Modal.js
│   │   ├── pages/
│   │   │   ├── Landing.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── RecipeDetails.js
│   │   │   ├── AddRecipe.js
│   │   │   ├── Profile.js
│   │   │   ├── Favorites.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Recipes
- `GET /api/recipes` - Get all recipes (with filters)
- `GET /api/recipes/:id` - Get recipe by ID
- `GET /api/recipes/trending` - Get trending recipes
- `GET /api/recipes/top-rated` - Get top rated recipes
- `GET /api/recipes/most-liked` - Get most liked recipes
- `POST /api/recipes` - Create a new recipe (protected)
- `PUT /api/recipes/:id` - Update a recipe (protected)
- `DELETE /api/recipes/:id` - Delete a recipe (protected)
- `POST /api/recipes/:id/like` - Like/Unlike a recipe (protected)

### Users
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/:id/recipes` - Get recipes by user
- `GET /api/users/favorites` - Get user's favorites (protected)
- `POST /api/users/favorites/:recipeId` - Toggle favorite (protected)

### Reviews
- `POST /api/reviews` - Create/Update a review (protected)
- `GET /api/reviews/recipe/:recipeId` - Get reviews for a recipe
- `DELETE /api/reviews/:id` - Delete a review (protected)

## Seed Data

After running the seed script, recipes will be created with a default user account. 
All users can sign up using the Login/Signup pages to create their own accounts.

## Sample Recipes

The seed script includes 30+ authentic Indian recipes across various categories:
- North Indian (Butter Chicken, Biryani, Dal Makhani, etc.)
- South Indian (Masala Dosa, Idli Sambar, Upma, etc.)
- Gujarati (Dhokla, Undhiyu, etc.)
- Bengali (Fish Curry, Rasgulla, etc.)
- Punjabi (Sarson ka Saag, etc.)
- Rajasthani (Dal Baati Churma, Gatte ki Sabzi, etc.)
- Street Food (Pav Bhaji, Vada Pav, Pani Puri, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact: contact@recipefinder.com

---

**Happy Cooking! 🍛**

