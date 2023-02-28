const { Router } = require('express');
const router = Router();
const axios = require ('axios');
const { TypeDiet } = require('../db');
const { YOUR_API_KEY } = process.env;

router.get('/', async (req, res) => {
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
    const diets = dietsApi.data.results.map(e => e.diets)
    const results = diets.filter(d => d.length !== 0)
    const dietsEach = results.map(e => {
        for (let i = 0; i < e.length; i++) {
            TypeDiet.findOrCreate({
                where: { name: e[i] }
            })
        }
    })
    const allDiets = await TypeDiet.findAll();
    res.status(200).send(allDiets);
});

module.exports = router;