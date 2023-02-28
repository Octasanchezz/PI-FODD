const { Router } = require('express');
// Importar todos los routers;
const recipes = require('./getRecipes.js');
const diets = require('./getDiets.js');
const postrecipes = require('./postRecipe.js');
const recipesId = require('./getRecipesId');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.use('/recipes', recipes);
router.use('/diets', diets);
router.use('/recipes', postrecipes);
router.use('/recipes', recipesId);
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
