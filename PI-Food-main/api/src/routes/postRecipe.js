const { Router } = require('express');
const router = Router();
const { Recipe, TypeDiet } = require('../db');

router.post('/', async (req, res) => {
    let {
        title,
        summary,
        healthScore,
        stepByStep,
        diets,
        image,
        createdInDb
    } = req.body

    let recipeCreated = await Recipe.create({
        title,
        summary,
        healthScore,
        stepByStep,
        image,
        createdInDb
    })

    let dietsDb = await TypeDiet.findAll({
        where: { name: diets }
    })
    recipeCreated.addTypeDiet(dietsDb)
    res.status(200).send("Personaje creado con exito");
});

module.exports = router;