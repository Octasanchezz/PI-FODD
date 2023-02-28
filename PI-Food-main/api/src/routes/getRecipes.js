const { Router } = require('express');
const router = Router();
const {
    getAllRecipes,
} = require('../contollers/recipes.js');

router.get('/', async (req, res) => {
    const { name } = req.query;
    let recipesTotal = await getAllRecipes();
    try {
        if (name) {
            let recipeName = await recipesTotal.filter(e => e.title.toLowerCase().includes(name.toLowerCase()))
            recipeName.length ?
                res.status(200).send(recipeName) :
                res.status(404).send(`There are no recipes with that ${name}`);
        } else {
            res.status(200).send(recipesTotal);
        }
    } catch (error) {
        res.status(404).send(error);
    }

});
 
router.delete("/delete", async (req, res) => {
    
})

module.exports = router;