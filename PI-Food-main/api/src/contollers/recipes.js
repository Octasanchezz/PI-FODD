require('dotenv').config();
const axios = require('axios');
const { Recipe, TypeDiet } = require('../db');
const { YOUR_API_KEY } = process.env;

const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
        const apiInfo = await apiUrl.data.results.map(e => {
            return {
                id: e.id,
                title: e.title,
                image: e.image,
                summary: e.summary,
                healthScore: e.healthScore,
                stepByStep: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps ? e.analyzedInstructions[0].steps.map(s => s.step).join("\n") : ""),
                diets: e.diets,
                dishTypes: e.dishTypes,
                vegetarian: e.vegetarian,
                vegan: e.vegan,
                glutenFree: e.glutenFree,
                dairyFree: e.dairyFree
            }
        });
        return apiInfo;
    } catch (error) {
        console.log(error)
    }
};

const getDbInfo = async () => {
    try {
        return await Recipe.findAll({
            include: {
                model: TypeDiet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

const getById = async (id) => {
    console.log(id);
    try {
        const apiUrlId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`);
        const e = apiUrlId.data;
            return {
                id: e.id,
                title: e.title,
                image: e.image,
                summary: e.summary,
                healthScore: e.healthScore,
                dishTypes: e.dishTypes,
                stepByStep: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps ? e.analyzedInstructions[0].steps.map(s => s.step).join(" \n") : ''),
                diets: e.diets,
        }
    } catch (error) {
        console.log(error);
    }
};

const searchByIdDb = async (id) => {
    try {
        const recipe = await Recipe.findByPk(id);
        return recipe;
    } catch (error) {
        console.log(error);
    }
};

const searchById = async (id) => {
    const apiRecipes = await getById(id);
    const dbRecipes = await searchByIdDb(id);

    const [apiRecipesRes, dbRecipesRes] = await Promise.all([dbRecipes, apiRecipes]);
    return dbRecipesRes || apiRecipesRes;

};

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getById,
    searchByIdDb,
    searchById
};