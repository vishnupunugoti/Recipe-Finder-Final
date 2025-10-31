const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

dotenv.config();

const recipes = [
  {
    title: 'Butter Chicken',
    description: 'Creamy and rich tomato-based curry with tender chicken pieces, a North Indian classic.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Chicken', quantity: '500g' },
      { name: 'Tomatoes', quantity: '4 large' },
      { name: 'Butter', quantity: '3 tbsp' },
      { name: 'Heavy cream', quantity: '1 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      { step: 1, description: 'Marinate chicken with yogurt, ginger-garlic paste, and spices for 2 hours.' },
      { step: 2, description: 'Cook chicken in a pan until golden brown, set aside.' },
      { step: 3, description: 'In the same pan, add butter and sauté onions until translucent.' },
      { step: 4, description: 'Add tomatoes and cook until soft. Blend into a smooth puree.' },
      { step: 5, description: 'Add spices and cream, simmer for 10 minutes.' },
      { step: 6, description: 'Add cooked chicken and simmer for 15 minutes. Serve hot with naan.' }
    ],
    prepTime: 30,
    cookTime: 45,
    servings: 4
  },
  {
    title: 'Biryani',
    description: 'Fragrant basmati rice layered with spiced meat and caramelized onions.',
    category: 'North Indian',
    region: 'Hyderabad',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Basmati rice', quantity: '2 cups' },
      { name: 'Chicken/Mutton', quantity: '500g' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Onions', quantity: '3 large' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Biryani masala', quantity: '2 tbsp' },
      { name: 'Saffron', quantity: '1 pinch' },
      { name: 'Mint leaves', quantity: '1/2 cup' },
      { name: 'Cilantro', quantity: '1/2 cup' },
      { name: 'Ghee', quantity: '4 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak basmati rice for 30 minutes, partially boil until 70% cooked.' },
      { step: 2, description: 'Marinate meat with yogurt, spices, and ginger-garlic paste.' },
      { step: 3, description: 'Cook meat until tender and set aside.' },
      { step: 4, description: 'Fry onions until golden brown and crispy.' },
      { step: 5, description: 'Layer rice and meat in a heavy-bottomed pot with fried onions and herbs.' },
      { step: 6, description: 'Drizzle saffron milk and ghee. Cover and cook on dum for 20 minutes.' }
    ],
    prepTime: 45,
    cookTime: 60,
    servings: 6
  },
  {
    title: 'Masala Dosa',
    description: 'Crispy fermented crepe filled with spiced potato filling, served with coconut chutney.',
    category: 'South Indian',
    region: 'Karnataka',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    ingredients: [
      { name: 'Rice', quantity: '2 cups' },
      { name: 'Urad dal', quantity: '1/2 cup' },
      { name: 'Fenugreek seeds', quantity: '1 tsp' },
      { name: 'Potatoes', quantity: '4 medium' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10-15 leaves' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      { step: 1, description: 'Soak rice and urad dal separately for 6 hours.' },
      { step: 2, description: 'Grind into a smooth batter, ferment overnight.' },
      { step: 3, description: 'Boil and mash potatoes.' },
      { step: 4, description: 'Sauté onions, mustard seeds, curry leaves, and spices.' },
      { step: 5, description: 'Mix with mashed potatoes to make filling.' },
      { step: 6, description: 'Pour batter on hot griddle, spread thin, cook until crispy.' },
      { step: 7, description: 'Add potato filling and fold. Serve with chutney and sambar.' }
    ],
    prepTime: 480,
    cookTime: 30,
    servings: 4
  },
  {
    title: 'Idli Sambar',
    description: 'Soft steamed rice cakes served with tangy lentil stew, a South Indian breakfast staple.',
    category: 'South Indian',
    region: 'Tamil Nadu',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Rice', quantity: '2 cups' },
      { name: 'Urad dal', quantity: '1 cup' },
      { name: 'Toor dal', quantity: '1/2 cup' },
      { name: 'Vegetables (drumstick, carrot)', quantity: '2 cups' },
      { name: 'Tamarind', quantity: 'small lemon size' },
      { name: 'Sambar powder', quantity: '2 tbsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Asafoetida', quantity: '1 pinch' }
    ],
    instructions: [
      { step: 1, description: 'Soak rice and urad dal for 6 hours, grind into smooth batter.' },
      { step: 2, description: 'Ferment batter overnight.' },
      { step: 3, description: 'Steam batter in idli molds for 10-12 minutes.' },
      { step: 4, description: 'Cook toor dal until soft and set aside.' },
      { step: 5, description: 'Boil vegetables in tamarind water, add sambar powder.' },
      { step: 6, description: 'Add cooked dal, temper with mustard seeds and curry leaves.' },
      { step: 7, description: 'Serve hot idlis with sambar and coconut chutney.' }
    ],
    prepTime: 480,
    cookTime: 40,
    servings: 4
  },
  {
    title: 'Dhokla',
    description: 'Soft, spongy fermented gram flour cakes, a popular Gujarati snack.',
    category: 'Gujarati',
    region: 'Gujarat',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    ingredients: [
      { name: 'Gram flour (besan)', quantity: '2 cups' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Ginger paste', quantity: '1 tsp' },
      { name: 'Green chilies', quantity: '2 chopped' },
      { name: 'Enos fruit salt', quantity: '1 tsp' },
      { name: 'Oil', quantity: '2 tbsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' }
    ],
    instructions: [
      { step: 1, description: 'Mix besan, yogurt, sugar, turmeric, ginger paste, and chilies.' },
      { step: 2, description: 'Add water to make a smooth batter, let it ferment for 3-4 hours.' },
      { step: 3, description: 'Add Enos fruit salt just before steaming, mix gently.' },
      { step: 4, description: 'Pour into greased plate and steam for 15-20 minutes.' },
      { step: 5, description: 'Temper with mustard seeds and curry leaves.' },
      { step: 6, description: 'Cut into pieces and garnish with cilantro. Serve with green chutney.' }
    ],
    prepTime: 240,
    cookTime: 20,
    servings: 6
  },
  {
    title: 'Undhiyu',
    description: 'Traditional Gujarati mixed vegetable dish cooked with fenugreek dumplings.',
    category: 'Gujarati',
    region: 'Gujarat',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800',
    ingredients: [
      { name: 'Eggplant', quantity: '2 small' },
      { name: 'Green beans', quantity: '200g' },
      { name: 'Sweet potato', quantity: '2 medium' },
      { name: 'Yam', quantity: '200g' },
      { name: 'Fenugreek leaves', quantity: '1 cup' },
      { name: 'Gram flour', quantity: '1/2 cup' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Undhiyu masala', quantity: '3 tbsp' },
      { name: 'Jaggery', quantity: '1 tbsp' },
      { name: 'Oil', quantity: '4 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Make muthiyas (dumplings) with fenugreek leaves and gram flour.' },
      { step: 2, description: 'Cut all vegetables into chunks.' },
      { step: 3, description: 'Heat oil in a heavy-bottomed pot, add vegetables and muthiyas.' },
      { step: 4, description: 'Add undhiyu masala, jaggery, and salt.' },
      { step: 5, description: 'Cover and cook on low heat for 40-45 minutes until vegetables are tender.' },
      { step: 6, description: 'Serve hot with puri or roti.' }
    ],
    prepTime: 30,
    cookTime: 50,
    servings: 6
  },
  {
    title: 'Fish Curry',
    description: 'Tangy and spicy fish curry with mustard seeds and coconut, a Bengali favorite.',
    category: 'Bengali',
    region: 'West Bengal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
    ingredients: [
      { name: 'Rohu fish', quantity: '500g' },
      { name: 'Mustard oil', quantity: '3 tbsp' },
      { name: 'Mustard seeds', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Ginger paste', quantity: '1 tbsp' },
      { name: 'Mustard paste', quantity: '1 tbsp' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      { step: 1, description: 'Marinate fish with turmeric and salt for 15 minutes.' },
      { step: 2, description: 'Fry fish pieces until golden, set aside.' },
      { step: 3, description: 'Heat mustard oil, add mustard seeds and let them splutter.' },
      { step: 4, description: 'Add tomatoes, ginger paste, and spices, cook until oil separates.' },
      { step: 5, description: 'Add mustard paste and water, bring to boil.' },
      { step: 6, description: 'Add fish pieces and simmer for 10 minutes. Serve with steamed rice.' }
    ],
    prepTime: 20,
    cookTime: 30,
    servings: 4
  },
  {
    title: 'Rasgulla',
    description: 'Soft, spongy cottage cheese balls soaked in sugar syrup, a classic Bengali dessert.',
    category: 'Bengali',
    region: 'West Bengal',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800',
    ingredients: [
      { name: 'Full cream milk', quantity: '1 liter' },
      { name: 'Lemon juice', quantity: '3 tbsp' },
      { name: 'Sugar', quantity: '2 cups' },
      { name: 'Water', quantity: '4 cups' },
      { name: 'Cardamom powder', quantity: '1/2 tsp' }
    ],
    instructions: [
      { step: 1, description: 'Boil milk, add lemon juice to curdle it.' },
      { step: 2, description: 'Strain and wash chenna (cottage cheese) thoroughly.' },
      { step: 3, description: 'Knead chenna until smooth and pliable.' },
      { step: 4, description: 'Make small smooth balls without cracks.' },
      { step: 5, description: 'Boil sugar syrup, gently drop balls into hot syrup.' },
      { step: 6, description: 'Cover and cook for 15-20 minutes until balls double in size.' },
      { step: 7, description: 'Chill and serve cold.' }
    ],
    prepTime: 45,
    cookTime: 30,
    servings: 8
  },
  {
    title: 'Dal Makhani',
    description: 'Creamy black lentils cooked overnight with butter and cream, a Punjabi delicacy.',
    category: 'Punjabi',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    ingredients: [
      { name: 'Black urad dal', quantity: '1 cup' },
      { name: 'Rajma (kidney beans)', quantity: '1/4 cup' },
      { name: 'Butter', quantity: '3 tbsp' },
      { name: 'Cream', quantity: '1/2 cup' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Kasuri methi', quantity: '1 tsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak dals overnight, pressure cook until soft.' },
      { step: 2, description: 'Heat butter, sauté onions until golden brown.' },
      { step: 3, description: 'Add tomatoes and ginger-garlic paste, cook until soft.' },
      { step: 4, description: 'Add spices and cooked dal, simmer for 30 minutes.' },
      { step: 5, description: 'Mash some dal for creaminess, add cream and kasuri methi.' },
      { step: 6, description: 'Simmer for 10 more minutes. Serve with naan or rice.' }
    ],
    prepTime: 480,
    cookTime: 50,
    servings: 6
  },
  {
    title: 'Sarson ka Saag',
    description: 'Mustard greens curry served with makke ki roti, a winter specialty from Punjab.',
    category: 'Punjabi',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1582053435795-e41ba9b81c0f?w=800',
    ingredients: [
      { name: 'Mustard greens', quantity: '500g' },
      { name: 'Spinach', quantity: '250g' },
      { name: 'Cornmeal (makki ka atta)', quantity: '2 cups' },
      { name: 'Ginger', quantity: '2 inch piece' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Butter', quantity: '3 tbsp' },
      { name: 'Onion', quantity: '1 large' },
      { name: 'Garlic', quantity: '5-6 cloves' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      { step: 1, description: 'Clean and chop mustard greens and spinach.' },
      { step: 2, description: 'Pressure cook greens with ginger and chilies until soft.' },
      { step: 3, description: 'Mash the cooked greens coarsely.' },
      { step: 4, description: 'Heat butter in a pan, add onions and garlic, sauté until golden.' },
      { step: 5, description: 'Add mashed greens, cook for 10-15 minutes on low heat.' },
      { step: 6, description: 'Serve hot with makke ki roti and jaggery.' }
    ],
    prepTime: 20,
    cookTime: 45,
    servings: 4
  },
  {
    title: 'Dal Baati Churma',
    description: 'Rajasthani specialty with crispy baked wheat balls, dal, and sweet churma.',
    category: 'Rajasthani',
    region: 'Rajasthan',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1613564834361-606694c7a5c4?w=800',
    ingredients: [
      { name: 'Wheat flour', quantity: '2 cups' },
      { name: 'Toor dal', quantity: '1/2 cup' },
      { name: 'Chana dal', quantity: '1/4 cup' },
      { name: 'Moong dal', quantity: '1/4 cup' },
      { name: 'Ghee', quantity: '1/2 cup' },
      { name: 'Sugar', quantity: '1/2 cup' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Asafoetida', quantity: '1 pinch' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      { step: 1, description: 'Mix wheat flour with ghee, water, and salt to make dough for baati.' },
      { step: 2, description: 'Shape into balls, bake in oven or tandoor until golden brown.' },
      { step: 3, description: 'Cook all dals together with spices until soft.' },
      { step: 4, description: 'Temper dal with cumin, asafoetida, and red chilies.' },
      { step: 5, description: 'Crush some baatis, mix with ghee and sugar to make churma.' },
      { step: 6, description: 'Serve hot baatis with dal, churma, and ghee.' }
    ],
    prepTime: 30,
    cookTime: 60,
    servings: 6
  },
  {
    title: 'Gatte ki Sabzi',
    description: 'Gram flour dumplings in spicy yogurt gravy, a classic Rajasthani dish.',
    category: 'Rajasthani',
    region: 'Rajasthan',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Gram flour (besan)', quantity: '1 cup' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1/2 tsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Asafoetida', quantity: '1 pinch' },
      { name: 'Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Mix besan with spices, yogurt, and oil to make dough.' },
      { step: 2, description: 'Shape into cylindrical rolls, boil in water for 10 minutes.' },
      { step: 3, description: 'Cut boiled gattas into pieces, shallow fry until golden.' },
      { step: 4, description: 'Whisk yogurt with spices to make gravy base.' },
      { step: 5, description: 'Heat oil, add cumin and asafoetida, add yogurt mixture.' },
      { step: 6, description: 'Cook gravy, add gattas, simmer for 10 minutes. Serve hot with roti.' }
    ],
    prepTime: 30,
    cookTime: 35,
    servings: 4
  },
  {
    title: 'Pav Bhaji',
    description: 'Spicy vegetable mash served with buttered buns, a popular Mumbai street food.',
    category: 'Street Food',
    region: 'Maharashtra',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ingredients: [
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Cauliflower', quantity: '1 cup chopped' },
      { name: 'Peas', quantity: '1/2 cup' },
      { name: 'Capsicum', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '4 large' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Pav bhaji masala', quantity: '2 tbsp' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Pav buns', quantity: '8 pieces' },
      { name: 'Lemon', quantity: '2' }
    ],
    instructions: [
      { step: 1, description: 'Boil vegetables until soft, mash coarsely.' },
      { step: 2, description: 'Heat butter, sauté onions until translucent.' },
      { step: 3, description: 'Add tomatoes and pav bhaji masala, cook until oil separates.' },
      { step: 4, description: 'Add mashed vegetables, mix well and cook for 15 minutes.' },
      { step: 5, description: 'Butter pav buns and toast on griddle.' },
      { step: 6, description: 'Serve hot bhaji with buttered pav, chopped onions, and lemon wedges.' }
    ],
    prepTime: 20,
    cookTime: 35,
    servings: 4
  },
  {
    title: 'Vada Pav',
    description: 'Spiced potato fritter in a bun, Mumbai\'s favorite street food.',
    category: 'Street Food',
    region: 'Maharashtra',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Besan (gram flour)', quantity: '1/2 cup' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Garlic', quantity: '5-6 cloves' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Pav buns', quantity: '8' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Boil and mash potatoes.' },
      { step: 2, description: 'Sauté mustard seeds, curry leaves, ginger-garlic, and chilies.' },
      { step: 3, description: 'Mix with mashed potatoes, shape into balls and flatten.' },
      { step: 4, description: 'Dip in besan batter, deep fry until golden brown.' },
      { step: 5, description: 'Serve hot vada in pav with green chutney and garlic chutney.' }
    ],
    prepTime: 25,
    cookTime: 20,
    servings: 4
  },
  {
    title: 'Dahi Puri',
    description: 'Crispy shells filled with spiced potatoes, topped with yogurt and chutneys.',
    category: 'Street Food',
    region: 'Gujarat',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Puri shells', quantity: '20 pieces' },
      { name: 'Potatoes', quantity: '3 medium' },
      { name: 'Chickpeas', quantity: '1/2 cup boiled' },
      { name: 'Yogurt', quantity: '2 cups' },
      { name: 'Tamarind chutney', quantity: '1/2 cup' },
      { name: 'Green chutney', quantity: '1/2 cup' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Chaat masala', quantity: '1 tbsp' },
      { name: 'Coriander leaves', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Boil and mash potatoes, mix with chickpeas and spices.' },
      { step: 2, description: 'Make small holes in puri shells.' },
      { step: 3, description: 'Fill with potato mixture.' },
      { step: 4, description: 'Top with yogurt, tamarind chutney, and green chutney.' },
      { step: 5, description: 'Sprinkle chaat masala and red chili powder.' },
      { step: 6, description: 'Garnish with coriander and serve immediately.' }
    ],
    prepTime: 20,
    cookTime: 10,
    servings: 4
  },
  {
    title: 'Chole Bhature',
    description: 'Spicy chickpea curry with fluffy deep-fried bread, a North Indian favorite.',
    category: 'Street Food',
    region: 'Delhi',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Chickpeas', quantity: '2 cups' },
      { name: 'All-purpose flour', quantity: '2 cups' },
      { name: 'Yogurt', quantity: '1/4 cup' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Chole masala', quantity: '2 tbsp' },
      { name: 'Tea bags', quantity: '2' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Soak chickpeas overnight, pressure cook with tea bags until soft.' },
      { step: 2, description: 'Make bhature dough with flour, yogurt, and salt. Rest for 2 hours.' },
      { step: 3, description: 'Sauté onions, add tomatoes and spices, cook until oil separates.' },
      { step: 4, description: 'Add cooked chickpeas, simmer for 15 minutes.' },
      { step: 5, description: 'Roll bhatures and deep fry until puffed and golden.' },
      { step: 6, description: 'Serve hot chole with bhature, pickled onions, and green chilies.' }
    ],
    prepTime: 480,
    cookTime: 45,
    servings: 4
  },
  {
    title: 'Aloo Paratha',
    description: 'Whole wheat flatbread stuffed with spiced potato filling.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ingredients: [
      { name: 'Wheat flour', quantity: '2 cups' },
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Onions', quantity: '1 medium' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Amchur powder', quantity: '1/2 tsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Coriander leaves', quantity: '2 tbsp' },
      { name: 'Ghee', quantity: 'for cooking' }
    ],
    instructions: [
      { step: 1, description: 'Boil and mash potatoes.' },
      { step: 2, description: 'Mix mashed potatoes with chopped onions, chilies, and spices.' },
      { step: 3, description: 'Make wheat flour dough, rest for 30 minutes.' },
      { step: 4, description: 'Stuff dough with potato filling, roll carefully.' },
      { step: 5, description: 'Cook on griddle with ghee until golden on both sides.' },
      { step: 6, description: 'Serve hot with butter, yogurt, and pickle.' }
    ],
    prepTime: 35,
    cookTime: 25,
    servings: 4
  },
  {
    title: 'Rajma Chawal',
    description: 'Kidney beans curry served with steamed rice, a comfort food from North India.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1582053435795-e41ba9b81c0f?w=800',
    ingredients: [
      { name: 'Rajma (kidney beans)', quantity: '2 cups' },
      { name: 'Basmati rice', quantity: '2 cups' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Coriander leaves', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Soak rajma overnight, pressure cook until soft.' },
      { step: 2, description: 'Cook basmati rice separately, keep aside.' },
      { step: 3, description: 'Heat oil, add cumin seeds, sauté onions until golden.' },
      { step: 4, description: 'Add tomatoes and spices, cook until oil separates.' },
      { step: 5, description: 'Add cooked rajma with its water, simmer for 20 minutes.' },
      { step: 6, description: 'Garnish with coriander. Serve hot rajma with steamed rice.' }
    ],
    prepTime: 480,
    cookTime: 50,
    servings: 4
  },
  {
    title: 'Poha',
    description: 'Flattened rice cooked with onions, peanuts, and spices, a popular breakfast.',
    category: 'Street Food',
    region: 'Madhya Pradesh',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Poha (flattened rice)', quantity: '2 cups' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Potatoes', quantity: '2 medium' },
      { name: 'Peanuts', quantity: '1/4 cup' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Lemon', quantity: '1' },
      { name: 'Coriander leaves', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Rinse poha until soft, drain excess water.' },
      { step: 2, description: 'Heat oil, add mustard seeds and let them splutter.' },
      { step: 3, description: 'Add peanuts, curry leaves, and onions, sauté until onions are soft.' },
      { step: 4, description: 'Add diced potatoes, cook until tender.' },
      { step: 5, description: 'Add turmeric, green chilies, and poha, mix gently.' },
      { step: 6, description: 'Cook for 2-3 minutes. Garnish with lemon juice and coriander.' }
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4
  },
  {
    title: 'Upma',
    description: 'Semolina cooked with vegetables and spices, a South Indian breakfast dish.',
    category: 'South Indian',
    region: 'Karnataka',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Semolina (rava)', quantity: '1 cup' },
      { name: 'Onions', quantity: '1 medium' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Urad dal', quantity: '1 tsp' },
      { name: 'Chana dal', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Cashews', quantity: '10-12' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Oil', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Dry roast semolina until aromatic, set aside.' },
      { step: 2, description: 'Heat oil, add mustard seeds, urad dal, and chana dal.' },
      { step: 3, description: 'Add cashews, curry leaves, ginger, and chilies, sauté.' },
      { step: 4, description: 'Add onions, cook until translucent.' },
      { step: 5, description: 'Add water, salt, bring to boil. Gradually add semolina, stirring continuously.' },
      { step: 6, description: 'Cook until water is absorbed. Serve hot with chutney.' }
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4
  },
  {
    title: 'Misal Pav',
    description: 'Spicy sprouted lentils curry with pav, a Maharashtrian breakfast favorite.',
    category: 'Street Food',
    region: 'Maharashtra',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Matki (moth beans)', quantity: '1 cup sprouted' },
      { name: 'Pav buns', quantity: '8' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Coconut', quantity: '1/2 cup grated' },
      { name: 'Misal masala', quantity: '2 tbsp' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Farsan (savory mix)', quantity: '1/2 cup' },
      { name: 'Coriander leaves', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Cook sprouted matki until soft.' },
      { step: 2, description: 'Make paste with coconut, onions, tomatoes, and misal masala.' },
      { step: 3, description: 'Cook paste until oil separates, add cooked matki.' },
      { step: 4, description: 'Simmer for 15 minutes, adjust consistency with water.' },
      { step: 5, description: 'Toast pav buns with butter.' },
      { step: 6, description: 'Serve misal in bowl, top with farsan, onions, and coriander. Serve with pav.' }
    ],
    prepTime: 240,
    cookTime: 40,
    servings: 4
  },
  {
    title: 'Kachori',
    description: 'Deep-fried pastry filled with spiced lentil or potato mixture.',
    category: 'Street Food',
    region: 'Rajasthan',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 cups' },
      { name: 'Moong dal', quantity: '1/2 cup' },
      { name: 'Fennel seeds', quantity: '1 tsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1/2 tsp' },
      { name: 'Asafoetida', quantity: '1 pinch' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Soak moong dal for 2 hours, grind coarsely.' },
      { step: 2, description: 'Sauté spices with dal, cook until dry. Cool and set aside.' },
      { step: 3, description: 'Make dough with flour, oil, and water. Rest for 30 minutes.' },
      { step: 4, description: 'Stuff dough with dal mixture, shape into balls and flatten slightly.' },
      { step: 5, description: 'Deep fry on medium heat until golden and crispy.' },
      { step: 6, description: 'Serve hot with tamarind chutney and green chutney.' }
    ],
    prepTime: 120,
    cookTime: 30,
    servings: 6
  },
  {
    title: 'Ragda Pattice',
    description: 'Spiced white peas curry served with potato patties, a Mumbai street food.',
    category: 'Street Food',
    region: 'Maharashtra',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'White peas (vatana)', quantity: '1 cup' },
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Coriander leaves', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Soak white peas overnight, pressure cook until soft.' },
      { step: 2, description: 'Boil and mash potatoes, shape into patties.' },
      { step: 3, description: 'Shallow fry patties until golden brown.' },
      { step: 4, description: 'Cook peas with spices until thick gravy forms.' },
      { step: 5, description: 'Serve patties topped with ragda, chutneys, and sev.' },
      { step: 6, description: 'Garnish with onions, coriander, and lime juice.' }
    ],
    prepTime: 480,
    cookTime: 45,
    servings: 4
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Grilled chicken pieces in rich, creamy tomato-based curry.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Heavy cream', quantity: '1/2 cup' },
      { name: 'Tomatoes', quantity: '4 large' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Paprika', quantity: '1 tsp' },
      { name: 'Kasuri methi', quantity: '1 tsp' }
    ],
    instructions: [
      { step: 1, description: 'Marinate chicken with yogurt and spices for 4 hours.' },
      { step: 2, description: 'Grill or pan-fry chicken until cooked through.' },
      { step: 3, description: 'Sauté onions, add tomatoes and spices, cook until soft.' },
      { step: 4, description: 'Blend into smooth puree, add cream and kasuri methi.' },
      { step: 5, description: 'Add grilled chicken pieces, simmer for 10 minutes.' },
      { step: 6, description: 'Serve hot with naan or rice.' }
    ],
    prepTime: 240,
    cookTime: 40,
    servings: 4
  },
  {
    title: 'Pani Puri',
    description: 'Crispy hollow puris filled with spiced water, chickpeas, and potatoes.',
    category: 'Street Food',
    region: 'Gujarat',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1613564834361-606694c7a5c4?w=800',
    ingredients: [
      { name: 'Puri shells', quantity: '30 pieces' },
      { name: 'Tamarind', quantity: 'small lemon size' },
      { name: 'Mint leaves', quantity: '1 cup' },
      { name: 'Coriander leaves', quantity: '1 cup' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Black salt', quantity: '1 tsp' },
      { name: 'Cumin powder', quantity: '1 tsp' },
      { name: 'Potatoes', quantity: '3 medium' },
      { name: 'Chickpeas', quantity: '1/2 cup' }
    ],
    instructions: [
      { step: 1, description: 'Boil potatoes and chickpeas, dice potatoes.' },
      { step: 2, description: 'Blend mint, coriander, green chilies with water to make pani.' },
      { step: 3, description: 'Strain and add black salt, cumin powder, and tamarind.' },
      { step: 4, description: 'Make small hole in puri, fill with potatoes and chickpeas.' },
      { step: 5, description: 'Fill with spicy pani, eat immediately.' },
      { step: 6, description: 'Serve with sweet tamarind chutney on the side.' }
    ],
    prepTime: 30,
    cookTime: 15,
    servings: 6
  },
  {
    title: 'Samosa',
    description: 'Deep-fried pastry filled with spiced potato and peas mixture.',
    category: 'Street Food',
    region: 'North India',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 cups' },
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Green peas', quantity: '1/2 cup' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Amchur powder', quantity: '1/2 tsp' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Boil and mash potatoes.' },
      { step: 2, description: 'Sauté cumin, ginger, chilies, add peas and mashed potatoes.' },
      { step: 3, description: 'Add spices, cool the mixture.' },
      { step: 4, description: 'Make dough with flour and oil, rest for 30 minutes.' },
      { step: 5, description: 'Shape into cones, fill with mixture, seal edges.' },
      { step: 6, description: 'Deep fry until golden and crispy. Serve with chutney.' }
    ],
    prepTime: 40,
    cookTime: 30,
    servings: 6
  },
  {
    title: 'Mutton Curry',
    description: 'Tender mutton pieces in aromatic spicy gravy, a rich North Indian dish.',
    category: 'North Indian',
    region: 'Kashmir',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
    ingredients: [
      { name: 'Mutton', quantity: '1 kg' },
      { name: 'Onions', quantity: '3 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tbsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Coriander leaves', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Marinate mutton with yogurt and spices for 2 hours.' },
      { step: 2, description: 'Heat oil, sauté onions until golden brown.' },
      { step: 3, description: 'Add ginger-garlic paste and tomatoes, cook until soft.' },
      { step: 4, description: 'Add marinated mutton, cook on high heat for 5 minutes.' },
      { step: 5, description: 'Add water, cover and cook on low heat for 45-60 minutes until tender.' },
      { step: 6, description: 'Garnish with coriander. Serve hot with naan or rice.' }
    ],
    prepTime: 120,
    cookTime: 75,
    servings: 6
  },
  {
    title: 'Gulab Jamun',
    description: 'Sweet milk solids dumplings soaked in sugar syrup, a popular Indian dessert.',
    category: 'Other',
    region: 'North India',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800',
    ingredients: [
      { name: 'Milk powder', quantity: '1 cup' },
      { name: 'All-purpose flour', quantity: '1/4 cup' },
      { name: 'Ghee', quantity: '1 tbsp' },
      { name: 'Milk', quantity: '2-3 tbsp' },
      { name: 'Sugar', quantity: '2 cups' },
      { name: 'Water', quantity: '2 cups' },
      { name: 'Cardamom powder', quantity: '1/2 tsp' },
      { name: 'Rose water', quantity: '1 tsp' }
    ],
    instructions: [
      { step: 1, description: 'Mix milk powder, flour, and ghee. Add milk to make soft dough.' },
      { step: 2, description: 'Shape into small smooth balls without cracks.' },
      { step: 3, description: 'Boil sugar and water to make syrup, add cardamom and rose water.' },
      { step: 4, description: 'Heat oil on low, deep fry jamuns until golden brown.' },
      { step: 5, description: 'Soak hot jamuns in warm syrup for at least 2 hours.' },
      { step: 6, description: 'Serve warm or cold.' }
    ],
    prepTime: 30,
    cookTime: 30,
    servings: 8
  },
  {
    title: 'Jalebi',
    description: 'Crispy, spiral-shaped sweet soaked in sugar syrup.',
    category: 'Street Food',
    region: 'North India',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'All-purpose flour', quantity: '1 cup' },
      { name: 'Yogurt', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1/4 tsp' },
      { name: 'Sugar', quantity: '1.5 cups' },
      { name: 'Water', quantity: '1 cup' },
      { name: 'Saffron', quantity: 'few strands' },
      { name: 'Cardamom powder', quantity: '1/4 tsp' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Mix flour, yogurt, turmeric, and water to make smooth batter.' },
      { step: 2, description: 'Ferment batter for 8-10 hours until slightly sour.' },
      { step: 3, description: 'Boil sugar and water to make one-string consistency syrup.' },
      { step: 4, description: 'Add saffron and cardamom to syrup, keep warm.' },
      { step: 5, description: 'Pour batter in circular motion in hot oil, fry until crispy.' },
      { step: 6, description: 'Soak hot jalebis in syrup for 30 seconds. Serve immediately.' }
    ],
    prepTime: 480,
    cookTime: 30,
    servings: 8
  },
  {
    title: 'Kadai Paneer',
    description: 'Spicy paneer curry cooked in a kadai (wok) with bell peppers and aromatic spices.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Paneer', quantity: '400g' },
      { name: 'Bell peppers', quantity: '2 medium' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Kadai masala', quantity: '2 tbsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Coriander powder', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Cream', quantity: '2 tbsp' },
      { name: 'Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Cut paneer into cubes, lightly fry until golden. Set aside.' },
      { step: 2, description: 'Sauté cumin seeds in hot oil until fragrant.' },
      { step: 3, description: 'Add onions and ginger-garlic paste, cook until golden.' },
      { step: 4, description: 'Add tomatoes and spices, cook until oil separates.' },
      { step: 5, description: 'Add bell peppers and paneer, mix gently.' },
      { step: 6, description: 'Add cream and simmer for 5 minutes. Garnish with coriander.' }
    ],
    prepTime: 20,
    cookTime: 25,
    servings: 4
  },
  {
    title: 'Palak Paneer',
    description: 'Creamy spinach curry with soft paneer cubes, a healthy North Indian favorite.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Paneer', quantity: '400g' },
      { name: 'Spinach', quantity: '500g' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Cream', quantity: '2 tbsp' },
      { name: 'Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Blanch spinach in boiling water, puree until smooth.' },
      { step: 2, description: 'Cut paneer into cubes, lightly fry until golden.' },
      { step: 3, description: 'Heat oil, add cumin seeds, then onions and ginger-garlic paste.' },
      { step: 4, description: 'Add tomatoes and spices, cook until soft.' },
      { step: 5, description: 'Add spinach puree, simmer for 10 minutes.' },
      { step: 6, description: 'Add paneer and cream, simmer for 5 minutes. Serve hot with naan.' }
    ],
    prepTime: 20,
    cookTime: 30,
    servings: 4
  },
  {
    title: 'Chana Masala',
    description: 'Spicy chickpea curry with tangy flavors, a North Indian vegetarian classic.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Chickpeas (kabuli chana)', quantity: '2 cups boiled' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Chana masala powder', quantity: '2 tbsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Amchur powder', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Coriander leaves', quantity: 'for garnish' },
      { name: 'Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak chickpeas overnight, pressure cook until soft.' },
      { step: 2, description: 'Heat oil, add cumin seeds, sauté onions until golden.' },
      { step: 3, description: 'Add ginger-garlic paste and tomatoes, cook until soft.' },
      { step: 4, description: 'Add chana masala powder and other spices, cook until oil separates.' },
      { step: 5, description: 'Add boiled chickpeas with water, simmer for 15 minutes.' },
      { step: 6, description: 'Garnish with coriander leaves. Serve with roti or rice.' }
    ],
    prepTime: 480,
    cookTime: 40,
    servings: 4
  },
  {
    title: 'Malai Kofta',
    description: 'Soft cottage cheese dumplings in rich, creamy tomato-based gravy.',
    category: 'North Indian',
    region: 'Uttar Pradesh',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Paneer', quantity: '300g' },
      { name: 'Potatoes', quantity: '2 medium' },
      { name: 'Cornflour', quantity: '2 tbsp' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Cashews', quantity: '15-20' },
      { name: 'Heavy cream', quantity: '1/2 cup' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Boil and mash potatoes. Grate paneer and mix with potatoes.' },
      { step: 2, description: 'Add cornflour, salt, and spices. Shape into balls.' },
      { step: 3, description: 'Deep fry koftas until golden brown, set aside.' },
      { step: 4, description: 'Soak cashews, blend with tomatoes and onions into smooth paste.' },
      { step: 5, description: 'Cook paste until oil separates, add spices and cream.' },
      { step: 6, description: 'Add koftas gently, simmer for 5 minutes. Serve hot.' }
    ],
    prepTime: 30,
    cookTime: 45,
    servings: 4
  },
  {
    title: 'Shahi Paneer',
    description: 'Royal creamy paneer curry with rich cashew and tomato gravy.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Paneer', quantity: '400g' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Cashews', quantity: '15-20' },
      { name: 'Heavy cream', quantity: '1/2 cup' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Kasuri methi', quantity: '1 tsp' },
      { name: 'Cardamom powder', quantity: '1/4 tsp' },
      { name: 'Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak cashews in warm water for 30 minutes.' },
      { step: 2, description: 'Blend cashews, onions, and tomatoes into smooth paste.' },
      { step: 3, description: 'Heat oil, add ginger-garlic paste and paste, cook until oil separates.' },
      { step: 4, description: 'Add spices, cream, and kasuri methi.' },
      { step: 5, description: 'Add paneer cubes, simmer for 5 minutes on low heat.' },
      { step: 6, description: 'Garnish with cream. Serve hot with naan or biryani.' }
    ],
    prepTime: 30,
    cookTime: 30,
    servings: 4
  },
  {
    title: 'Uttapam',
    description: 'Thick, fluffy pancake made with fermented rice and lentil batter, topped with vegetables.',
    category: 'South Indian',
    region: 'Tamil Nadu',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Rice', quantity: '2 cups' },
      { name: 'Urad dal', quantity: '1/2 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Cilantro', quantity: '1/2 cup' },
      { name: 'Carrot', quantity: '1 medium' },
      { name: 'Capsicum', quantity: '1 medium' },
      { name: 'Oil', quantity: 'for cooking' }
    ],
    instructions: [
      { step: 1, description: 'Soak rice and urad dal separately for 6 hours.' },
      { step: 2, description: 'Grind into smooth batter, ferment overnight.' },
      { step: 3, description: 'Chop vegetables finely for toppings.' },
      { step: 4, description: 'Heat griddle, pour thick layer of batter.' },
      { step: 5, description: 'Sprinkle vegetables on top, drizzle oil around edges.' },
      { step: 6, description: 'Cook until bottom is golden, flip and cook other side. Serve hot with chutney.' }
    ],
    prepTime: 480,
    cookTime: 20,
    servings: 4
  },
  {
    title: 'Rava Dosa',
    description: 'Crispy instant dosa made with semolina, no fermentation required.',
    category: 'South Indian',
    region: 'Karnataka',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    ingredients: [
      { name: 'Semolina (rava)', quantity: '1 cup' },
      { name: 'Rice flour', quantity: '1/2 cup' },
      { name: 'All-purpose flour', quantity: '1/4 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Cilantro', quantity: '2 tbsp' },
      { name: 'Water', quantity: 'as needed' }
    ],
    instructions: [
      { step: 1, description: 'Mix semolina, rice flour, and all-purpose flour.' },
      { step: 2, description: 'Add water gradually to make thin batter, rest for 30 minutes.' },
      { step: 3, description: 'Add chopped onions, chilies, ginger, and spices to batter.' },
      { step: 4, description: 'Heat griddle, pour batter in circular motion from outside to inside.' },
      { step: 5, description: 'Add oil around edges, cook until crispy and golden brown.' },
      { step: 6, description: 'Serve hot with coconut chutney and sambar.' }
    ],
    prepTime: 30,
    cookTime: 20,
    servings: 4
  },
  {
    title: 'Rava Idli',
    description: 'Soft and fluffy instant idli made with semolina, perfect for breakfast.',
    category: 'South Indian',
    region: 'Karnataka',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Semolina (rava)', quantity: '1 cup' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Enos fruit salt', quantity: '1 tsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Urad dal', quantity: '1 tbsp' },
      { name: 'Chana dal', quantity: '1 tbsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Cashews', quantity: '10-12' },
      { name: 'Oil', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Dry roast semolina until aromatic, cool.' },
      { step: 2, description: 'Heat oil, add mustard seeds, urad dal, and chana dal.' },
      { step: 3, description: 'Add cashews, curry leaves, and chilies, sauté.' },
      { step: 4, description: 'Mix with semolina, add yogurt and water to make thick batter.' },
      { step: 5, description: 'Add Enos fruit salt just before steaming, mix gently.' },
      { step: 6, description: 'Pour into greased idli molds, steam for 12-15 minutes. Serve with chutney.' }
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4
  },
  {
    title: 'Medu Vada',
    description: 'Crispy, fluffy lentil fritters, a South Indian breakfast favorite.',
    category: 'South Indian',
    region: 'Tamil Nadu',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Urad dal', quantity: '1 cup' },
      { name: 'Rice flour', quantity: '1 tbsp' },
      { name: 'Onions', quantity: '1 medium' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Black pepper', quantity: '1 tsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Cilantro', quantity: '2 tbsp' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Soak urad dal for 4-6 hours, drain completely.' },
      { step: 2, description: 'Grind dal with minimal water to smooth, fluffy batter.' },
      { step: 3, description: 'Mix in chopped onions, chilies, ginger, and spices.' },
      { step: 4, description: 'Add rice flour for crispiness, mix well.' },
      { step: 5, description: 'Wet hands, shape into donut-like vadas with hole in center.' },
      { step: 6, description: 'Deep fry on medium heat until golden and crispy. Serve hot with sambar.' }
    ],
    prepTime: 360,
    cookTime: 30,
    servings: 4
  },
  {
    title: 'Dosa',
    description: 'Crispy fermented crepe made from rice and lentils, a South Indian staple.',
    category: 'South Indian',
    region: 'Tamil Nadu',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    ingredients: [
      { name: 'Rice', quantity: '2 cups' },
      { name: 'Urad dal', quantity: '1/2 cup' },
      { name: 'Fenugreek seeds', quantity: '1 tsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Oil', quantity: 'for cooking' }
    ],
    instructions: [
      { step: 1, description: 'Soak rice and urad dal separately for 6 hours.' },
      { step: 2, description: 'Grind urad dal to smooth paste, then grind rice coarsely.' },
      { step: 3, description: 'Mix both batters with fenugreek seeds, ferment overnight.' },
      { step: 4, description: 'Add salt to fermented batter, mix well.' },
      { step: 5, description: 'Heat griddle, pour thin layer of batter, drizzle oil around edges.' },
      { step: 6, description: 'Cook until crispy and golden. Serve with chutney and sambar.' }
    ],
    prepTime: 480,
    cookTime: 20,
    servings: 4
  },
  {
    title: 'Vada Sambar',
    description: 'Crispy lentil fritters served with tangy lentil stew, a classic South Indian combination.',
    category: 'South Indian',
    region: 'Tamil Nadu',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: [
      { name: 'Urad dal', quantity: '1 cup' },
      { name: 'Toor dal', quantity: '1/2 cup' },
      { name: 'Drumstick', quantity: '2 pieces' },
      { name: 'Carrot', quantity: '1 medium' },
      { name: 'Onion', quantity: '1 medium' },
      { name: 'Tamarind', quantity: 'small lemon size' },
      { name: 'Sambar powder', quantity: '2 tbsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Oil', quantity: 'for frying' }
    ],
    instructions: [
      { step: 1, description: 'Make vadas following medu vada recipe, deep fry until golden.' },
      { step: 2, description: 'Cook toor dal until soft, set aside.' },
      { step: 3, description: 'Boil vegetables in tamarind water until tender.' },
      { step: 4, description: 'Add sambar powder and cooked dal, bring to boil.' },
      { step: 5, description: 'Temper with mustard seeds and curry leaves.' },
      { step: 6, description: 'Serve hot vadas with sambar, coconut chutney on the side.' }
    ],
    prepTime: 360,
    cookTime: 40,
    servings: 4
  },
  {
    title: 'Thepla',
    description: 'Soft, spiced flatbread from Gujarat, perfect for travel and snacks.',
    category: 'Gujarati',
    region: 'Gujarat',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ingredients: [
      { name: 'Wheat flour', quantity: '2 cups' },
      { name: 'Fenugreek leaves (methi)', quantity: '1 cup chopped' },
      { name: 'Yogurt', quantity: '2 tbsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Cumin-coriander powder', quantity: '1 tsp' },
      { name: 'Sesame seeds', quantity: '1 tbsp' },
      { name: 'Oil', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Wash and chop fenugreek leaves finely.' },
      { step: 2, description: 'Mix flour with spices, fenugreek leaves, yogurt, and oil.' },
      { step: 3, description: 'Add water gradually to make soft dough, rest for 20 minutes.' },
      { step: 4, description: 'Divide into small balls, roll into thin circles.' },
      { step: 5, description: 'Cook on griddle with oil on both sides until golden spots appear.' },
      { step: 6, description: 'Serve hot with pickle, yogurt, or chunda (sweet mango pickle).' }
    ],
    prepTime: 25,
    cookTime: 20,
    servings: 6
  },
  {
    title: 'Khandvi',
    description: 'Soft, rolled gram flour snacks with tempered spices, a delicate Gujarati appetizer.',
    category: 'Gujarati',
    region: 'Gujarat',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    ingredients: [
      { name: 'Gram flour (besan)', quantity: '1 cup' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Ginger paste', quantity: '1 tsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Sesame seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Coconut', quantity: '2 tbsp grated' },
      { name: 'Cilantro', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Mix besan, yogurt, turmeric, and ginger paste with water to make smooth batter.' },
      { step: 2, description: 'Cook batter on low heat, stirring continuously until thick paste forms.' },
      { step: 3, description: 'Quickly spread thin layer on greased surface while hot.' },
      { step: 4, description: 'Let cool slightly, cut into strips and roll tightly.' },
      { step: 5, description: 'Temper with mustard seeds, sesame seeds, and curry leaves.' },
      { step: 6, description: 'Garnish with coconut and cilantro. Serve cold or at room temperature.' }
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 6
  },
  {
    title: 'Gujarati Dal',
    description: 'Sweet and tangy lentil curry with vegetables, a staple Gujarati dish.',
    category: 'Gujarati',
    region: 'Gujarat',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ingredients: [
      { name: 'Toor dal', quantity: '1 cup' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Green chilies', quantity: '2-3' },
      { name: 'Jaggery', quantity: '2 tbsp' },
      { name: 'Tamarind', quantity: 'small lemon size' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10 leaves' },
      { name: 'Cilantro', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Pressure cook toor dal until soft, set aside.' },
      { step: 2, description: 'Heat oil, add mustard and cumin seeds, let them splutter.' },
      { step: 3, description: 'Add green chilies, curry leaves, and turmeric.' },
      { step: 4, description: 'Add tomatoes, cook until soft, then add cooked dal.' },
      { step: 5, description: 'Add tamarind pulp and jaggery, simmer for 10 minutes.' },
      { step: 6, description: 'Garnish with cilantro. Serve with steamed rice or roti.' }
    ],
    prepTime: 10,
    cookTime: 35,
    servings: 4
  },
  {
    title: 'Shorshe Ilish',
    description: 'Hilsa fish cooked in mustard paste, a signature Bengali delicacy.',
    category: 'Bengali',
    region: 'West Bengal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
    ingredients: [
      { name: 'Hilsa fish', quantity: '500g' },
      { name: 'Mustard seeds', quantity: '3 tbsp' },
      { name: 'Mustard oil', quantity: '4 tbsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Green chilies', quantity: '4-5' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Kalojire (nigella seeds)', quantity: '1/2 tsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak mustard seeds in water for 2 hours, grind into smooth paste.' },
      { step: 2, description: 'Marinate fish with turmeric and salt for 15 minutes.' },
      { step: 3, description: 'Heat mustard oil until smoking, cool slightly.' },
      { step: 4, description: 'Add kalojire, mustard paste, turmeric, and green chilies.' },
      { step: 5, description: 'Add fish pieces gently, add water, cover and cook on low heat for 15 minutes.' },
      { step: 6, description: 'Drizzle mustard oil on top. Serve hot with steamed rice.' }
    ],
    prepTime: 120,
    cookTime: 20,
    servings: 4
  },
  {
    title: 'Chingri Malai Curry',
    description: 'Creamy prawn curry with coconut milk, a Bengali specialty.',
    category: 'Bengali',
    region: 'West Bengal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
    ingredients: [
      { name: 'Prawns', quantity: '500g' },
      { name: 'Coconut milk', quantity: '1 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Ginger paste', quantity: '1 tbsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1/2 tsp' },
      { name: 'Bay leaves', quantity: '2' },
      { name: 'Mustard oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Clean and devein prawns, marinate with turmeric and salt.' },
      { step: 2, description: 'Heat mustard oil, add bay leaves and onions, sauté until golden.' },
      { step: 3, description: 'Add ginger paste and spices, cook until oil separates.' },
      { step: 4, description: 'Add prawns, cook for 5 minutes on high heat.' },
      { step: 5, description: 'Add coconut milk, simmer for 10 minutes on low heat.' },
      { step: 6, description: 'Garnish with green chilies. Serve hot with steamed rice.' }
    ],
    prepTime: 20,
    cookTime: 25,
    servings: 4
  },
  {
    title: 'Sandesh',
    description: 'Sweet Bengali dessert made from fresh cottage cheese, cardamom, and saffron.',
    category: 'Bengali',
    region: 'West Bengal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800',
    ingredients: [
      { name: 'Full cream milk', quantity: '1 liter' },
      { name: 'Lemon juice', quantity: '3 tbsp' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Cardamom powder', quantity: '1/2 tsp' },
      { name: 'Saffron', quantity: 'few strands' },
      { name: 'Rose water', quantity: '1 tsp' }
    ],
    instructions: [
      { step: 1, description: 'Boil milk, add lemon juice to curdle it.' },
      { step: 2, description: 'Strain chenna (cottage cheese), wash thoroughly to remove lemon taste.' },
      { step: 3, description: 'Knead chenna until smooth and pliable, no grains remaining.' },
      { step: 4, description: 'Heat chenna with sugar on low heat, stirring continuously.' },
      { step: 5, description: 'Cook until mixture leaves sides of pan, add cardamom and saffron.' },
      { step: 6, description: 'Shape into desired forms while warm. Serve chilled.' }
    ],
    prepTime: 30,
    cookTime: 25,
    servings: 8
  },
  {
    title: 'Makke ki Roti',
    description: 'Flatbread made from cornmeal, traditionally served with sarson ka saag.',
    category: 'Punjabi',
    region: 'Punjab',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1582053435795-e41ba9b81c0f?w=800',
    ingredients: [
      { name: 'Cornmeal (makki ka atta)', quantity: '2 cups' },
      { name: 'Warm water', quantity: 'as needed' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Ghee', quantity: 'for serving' }
    ],
    instructions: [
      { step: 1, description: 'Mix cornmeal with salt, add warm water gradually.' },
      { step: 2, description: 'Knead into soft dough, rest for 15 minutes.' },
      { step: 3, description: 'Divide into balls, flatten between palms or cloth.' },
      { step: 4, description: 'Cook on griddle (tawa) on medium heat until brown spots appear.' },
      { step: 5, description: 'Flip and cook other side, apply ghee while hot.' },
      { step: 6, description: 'Serve hot with sarson ka saag, jaggery, and white butter.' }
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 6
  },
  {
    title: 'Chole Kulche',
    description: 'Spicy chickpea curry served with soft, fluffy leavened bread.',
    category: 'Street Food',
    region: 'Delhi',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Chickpeas (kabuli chana)', quantity: '2 cups' },
      { name: 'All-purpose flour', quantity: '2 cups' },
      { name: 'Yogurt', quantity: '1/4 cup' },
      { name: 'Baking soda', quantity: '1/2 tsp' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Chole masala', quantity: '2 tbsp' },
      { name: 'Amchur powder', quantity: '1 tsp' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Oil', quantity: 'for cooking' }
    ],
    instructions: [
      { step: 1, description: 'Soak chickpeas overnight, pressure cook until soft.' },
      { step: 2, description: 'Make kulche dough with flour, yogurt, baking soda, and salt. Rest for 2 hours.' },
      { step: 3, description: 'Cook chickpeas with onions, tomatoes, and chole masala until thick.' },
      { step: 4, description: 'Add amchur powder for tanginess.' },
      { step: 5, description: 'Roll kulche and cook on griddle until puffed with brown spots.' },
      { step: 6, description: 'Serve hot chole with kulche, chopped onions, and green chilies.' }
    ],
    prepTime: 480,
    cookTime: 45,
    servings: 4
  },
  {
    title: 'Bhel Puri',
    description: 'Crispy puffed rice snack with vegetables, chutneys, and spices.',
    category: 'Street Food',
    region: 'Mumbai',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1613564834361-606694c7a5c4?w=800',
    ingredients: [
      { name: 'Puffed rice (murmura)', quantity: '3 cups' },
      { name: 'Sev', quantity: '1/2 cup' },
      { name: 'Onions', quantity: '1 large' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Potatoes', quantity: '2 medium boiled' },
      { name: 'Cilantro', quantity: '1/4 cup' },
      { name: 'Tamarind chutney', quantity: '3 tbsp' },
      { name: 'Green chutney', quantity: '2 tbsp' },
      { name: 'Chaat masala', quantity: '1 tbsp' },
      { name: 'Lemon', quantity: '1' }
    ],
    instructions: [
      { step: 1, description: 'Finely chop onions, tomatoes, and boiled potatoes.' },
      { step: 2, description: 'In large bowl, add puffed rice and sev.' },
      { step: 3, description: 'Add chopped vegetables and cilantro.' },
      { step: 4, description: 'Add tamarind chutney and green chutney, mix gently.' },
      { step: 5, description: 'Sprinkle chaat masala and lemon juice, mix well.' },
      { step: 6, description: 'Serve immediately while crispy. Top with extra sev if desired.' }
    ],
    prepTime: 15,
    cookTime: 5,
    servings: 4
  },
  {
    title: 'Aloo Tikki',
    description: 'Spiced potato patties, crispy outside and soft inside, a popular street snack.',
    category: 'Street Food',
    region: 'Delhi',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    ingredients: [
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Bread crumbs', quantity: '3 tbsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Amchur powder', quantity: '1/2 tsp' },
      { name: 'Cilantro', quantity: '2 tbsp' },
      { name: 'Ginger', quantity: '1 inch grated' },
      { name: 'Oil', quantity: 'for shallow frying' }
    ],
    instructions: [
      { step: 1, description: 'Boil potatoes until soft, peel and mash completely.' },
      { step: 2, description: 'Add all spices, bread crumbs, and cilantro to mashed potatoes.' },
      { step: 3, description: 'Mix well and shape into round flat patties.' },
      { step: 4, description: 'Heat oil in pan, shallow fry patties until golden brown on both sides.' },
      { step: 5, description: 'Drain on paper towels.' },
      { step: 6, description: 'Serve hot with tamarind chutney, green chutney, and yogurt.' }
    ],
    prepTime: 25,
    cookTime: 20,
    servings: 6
  },
  {
    title: 'Dahi Vada',
    description: 'Soft lentil dumplings soaked in yogurt, topped with chutneys and spices.',
    category: 'Street Food',
    region: 'North India',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96d?w=800',
    ingredients: [
      { name: 'Urad dal', quantity: '1 cup' },
      { name: 'Yogurt', quantity: '2 cups' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Tamarind chutney', quantity: '1/2 cup' },
      { name: 'Green chutney', quantity: '1/2 cup' },
      { name: 'Cumin powder', quantity: '1 tsp' },
      { name: 'Red chili powder', quantity: '1/2 tsp' },
      { name: 'Chaat masala', quantity: '1 tsp' },
      { name: 'Cilantro', quantity: 'for garnish' }
    ],
    instructions: [
      { step: 1, description: 'Soak urad dal for 4-6 hours, grind to smooth fluffy batter.' },
      { step: 2, description: 'Whip batter until light and airy.' },
      { step: 3, description: 'Shape into balls, deep fry until golden brown.' },
      { step: 4, description: 'Soak fried vadas in warm water for 30 minutes, squeeze out water gently.' },
      { step: 5, description: 'Whisk yogurt with sugar and salt.' },
      { step: 6, description: 'Arrange vadas on plate, top with yogurt, chutneys, and spices. Serve chilled.' }
    ],
    prepTime: 360,
    cookTime: 30,
    servings: 6
  },
  {
    title: 'Biryani Rice',
    description: 'Fragrant basmati rice layered with meat and spices, cooked on dum.',
    category: 'North Indian',
    region: 'Hyderabad',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Basmati rice', quantity: '2 cups' },
      { name: 'Chicken/Mutton', quantity: '500g' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Saffron', quantity: '1 pinch' },
      { name: 'Milk', quantity: '1/4 cup warm' },
      { name: 'Onions', quantity: '3 large' },
      { name: 'Biryani masala', quantity: '2 tbsp' },
      { name: 'Ghee', quantity: '4 tbsp' },
      { name: 'Mint leaves', quantity: '1/2 cup' },
      { name: 'Cilantro', quantity: '1/2 cup' }
    ],
    instructions: [
      { step: 1, description: 'Soak rice for 30 minutes, partially boil until 70% cooked.' },
      { step: 2, description: 'Marinate meat with yogurt and biryani masala for 2 hours.' },
      { step: 3, description: 'Cook meat until tender, fry onions until crispy.' },
      { step: 4, description: 'Layer rice and meat in heavy pot with fried onions and herbs.' },
      { step: 5, description: 'Drizzle saffron milk and ghee, seal lid with dough.' },
      { step: 6, description: 'Cook on dum (steam) for 20 minutes on low heat. Serve hot.' }
    ],
    prepTime: 150,
    cookTime: 60,
    servings: 6
  },
  {
    title: 'Gajar ka Halwa',
    description: 'Sweet carrot pudding cooked in milk and ghee, garnished with nuts.',
    category: 'Other',
    region: 'North India',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800',
    ingredients: [
      { name: 'Carrots', quantity: '1 kg' },
      { name: 'Full cream milk', quantity: '1 liter' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Ghee', quantity: '4 tbsp' },
      { name: 'Cardamom powder', quantity: '1 tsp' },
      { name: 'Almonds', quantity: '15-20 sliced' },
      { name: 'Cashews', quantity: '10-12 chopped' },
      { name: 'Raisins', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Grate carrots finely.' },
      { step: 2, description: 'Cook grated carrots in milk on medium heat until milk reduces.' },
      { step: 3, description: 'Add sugar, stir continuously until thick.' },
      { step: 4, description: 'Add ghee, cardamom powder, and mix well.' },
      { step: 5, description: 'Fry nuts in ghee, add to halwa along with raisins.' },
      { step: 6, description: 'Cook until halwa leaves sides of pan. Serve hot or cold.' }
    ],
    prepTime: 20,
    cookTime: 45,
    servings: 6
  },
  {
    title: 'Kheer',
    description: 'Creamy rice pudding with cardamom, saffron, and nuts, a traditional Indian dessert.',
    category: 'Other',
    region: 'North India',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800',
    ingredients: [
      { name: 'Basmati rice', quantity: '1/4 cup' },
      { name: 'Full cream milk', quantity: '1 liter' },
      { name: 'Sugar', quantity: '1/2 cup' },
      { name: 'Cardamom powder', quantity: '1 tsp' },
      { name: 'Saffron', quantity: 'few strands' },
      { name: 'Almonds', quantity: '10-12 sliced' },
      { name: 'Cashews', quantity: '10-12 chopped' },
      { name: 'Raisins', quantity: '2 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak rice for 30 minutes, drain.' },
      { step: 2, description: 'Boil milk in heavy-bottomed pan, add rice.' },
      { step: 3, description: 'Cook on low heat, stirring frequently until rice is soft and milk thickens.' },
      { step: 4, description: 'Add sugar, cardamom powder, and saffron soaked in milk.' },
      { step: 5, description: 'Add nuts and raisins, simmer for 5 more minutes.' },
      { step: 6, description: 'Serve warm or chilled, garnished with more nuts.' }
    ],
    prepTime: 30,
    cookTime: 40,
    servings: 6
  },
  {
    title: 'Litti Chokha',
    description: 'Traditional Bihari dish: wheat balls stuffed with sattu, served with roasted vegetables.',
    category: 'Other',
    region: 'Bihar',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ingredients: [
      { name: 'Wheat flour', quantity: '2 cups' },
      { name: 'Sattu (roasted gram flour)', quantity: '1 cup' },
      { name: 'Eggplant', quantity: '2 large' },
      { name: 'Potatoes', quantity: '3 medium' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Mustard oil', quantity: '3 tbsp' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Cilantro', quantity: '1/4 cup' },
      { name: 'Lemon', quantity: '1' }
    ],
    instructions: [
      { step: 1, description: 'Make dough with wheat flour, salt, and water. Rest for 30 minutes.' },
      { step: 2, description: 'Mix sattu with spices, mustard oil, and lemon juice for stuffing.' },
      { step: 3, description: 'Stuff dough balls with sattu mixture, seal properly.' },
      { step: 4, description: 'Roast litti over charcoal or bake in oven until golden.' },
      { step: 5, description: 'Roast eggplant and boil potatoes, mash with spices for chokha.' },
      { step: 6, description: 'Break open litti, add ghee, serve with chokha and pickle.' }
    ],
    prepTime: 40,
    cookTime: 50,
    servings: 6
  },
  {
    title: 'Rajma Masala',
    description: 'Creamy kidney bean curry, a North Indian comfort food favorite.',
    category: 'North Indian',
    region: 'Punjab',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1582053435795-e41ba9b81c0f?w=800',
    ingredients: [
      { name: 'Kidney beans (rajma)', quantity: '2 cups' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Tomatoes', quantity: '3 medium' },
      { name: 'Ginger-garlic paste', quantity: '1 tbsp' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Red chili powder', quantity: '1 tsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Cream', quantity: '2 tbsp' },
      { name: 'Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      { step: 1, description: 'Soak rajma overnight, pressure cook until soft.' },
      { step: 2, description: 'Heat oil, add cumin seeds, sauté onions until golden.' },
      { step: 3, description: 'Add ginger-garlic paste and tomatoes, cook until soft.' },
      { step: 4, description: 'Add spices and cooked rajma with water, simmer for 20 minutes.' },
      { step: 5, description: 'Mash some rajma for creaminess, add cream.' },
      { step: 6, description: 'Garnish with cilantro. Serve hot with steamed rice.' }
    ],
    prepTime: 480,
    cookTime: 50,
    servings: 4
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spicetrail');
    console.log('Connected to MongoDB');

    // Create a default user for seeding recipes
    let author = await User.findOne({ email: 'spicetrail@example.com' });
    if (!author) {
      author = await User.create({
        name: 'SpiceTrail',
        email: 'spicetrail@example.com',
        password: 'password123',
        role: 'user'
      });
      console.log('Default user created for seeding recipes');
    }

    // Clear existing recipes
    await Recipe.deleteMany({});

    // Add recipes with author
    for (const recipeData of recipes) {
      const recipe = new Recipe({
        ...recipeData,
        author: author._id
      });
      await recipe.save();
    }

    console.log(`${recipes.length} recipes seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();

