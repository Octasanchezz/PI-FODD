const { Router } = require('express');
const router = Router();
const {
    searchById,
} = require('../contollers/recipes.js');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const recipeId = await searchById(id);
        if (recipeId) {
            res.status(200).json(recipeId);
        } else {
            res.status(404).send('No recipe found with that id');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})



module.exports = router;