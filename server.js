const express = require('express');
const app = express();
const path = require('path');

const recipes_path = './recipes.json'

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/recipes', async (req, res) => {
    res.json(await getRecipes());
})

app.post('/addRecipe', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.item === '' || req.body.item === undefined)
        res.json("Parameters error")
    else
        res.json(addRecipe(req.body.item));
})

app.post('/removeRecipe', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.recipe === '' || req.body.recipe === undefined)
        res.json("Parameters error")
    else
        res.json(removeRecipe(req.body.recipe));
})

app.get('/recipe', async (req, res) => {
    if (Object.keys(req.query).length === 0 || req.query.recipe === '' || req.query.recipe === undefined)
        res.json([])
    else
        res.json(await getRecipe(req.query.recipe));
})

app.post('/removeIngredient', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.recipe === '' || req.body.recipe === undefined || req.body.ingredient === '' || req.body.ingredient === undefined)
        res.json("Parameters error")
    else
        res.json(removeIngredient(req.body.recipe, req.body.ingredient));
})

app.post('/addIngredient', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.item === '' || req.body.item === undefined)
        res.json("Parameters error")
    else
        res.json(addIngredient(req.body.item));
})

app.get('/getIngredient', async (req, res) => {
    if (Object.keys(req.query).length === 0 || req.query.recipe === '' || req.query.recipe === undefined)
        res.json([])
    else
        res.json(await getIngredient(req.query.recipe, req.query.ingredient));
})

app.get('/shoppingList', async (req, res) => {
    res.json(await getRecipes());
})

async function getDataFromJson(filename) {
    const fs = require('fs').promises;

    return await fs.readFile(filename, 'utf8')
        .then(x => JSON.parse(x) || [])
}

async function writeDataToJson(data, filename) {
    const fs = require('fs').promises;
    const jsonContent = JSON.stringify(data);

    fs.writeFile(filename, jsonContent, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });
}

async function getRecipes() {
    var obj = []
    var json = await getDataFromJson(recipes_path)

    for(var recipe in json) {
        obj.push(recipe)
    }

    return obj
}

async function getRecipe(recipe) {
    var ingredients = {};
    const recipes = await getDataFromJson(recipes_path);

    for(var rec in recipes) {
        if (recipe.localeCompare(rec) === 0) {
            var recipe_data = recipes[rec];
            
            for(var ing in recipe_data) {
                if('recipe'.localeCompare(ing) === 0){
                    continue;
                }
                ingredients[ing] = recipe_data[ing];
            }

            var item = {
                "name" : rec,
                "ingredients" : ingredients,
                "recipe" : recipe_data['recipe'].join('\n')
            }
        }
    }
    return item
}

async function addRecipe(item) {
    var data = await getDataFromJson(recipes_path);

    if(data[item.item.name] === '' || data[item.item.name] === undefined)
        data[item.item.name] = {};

    data[item.item.name]['recipe'] = item.item.text.split('\n');
    await writeDataToJson(data, recipes_path);

}

async function removeRecipe(recipe) {
    var data = await getDataFromJson(recipes_path);
    delete data[recipe.recipe];
    await writeDataToJson(data, recipes_path);
}

async function getIngredient(recipe, ingredient) {

    const recipeData = await getRecipe(recipe);
    var ingredientsData = ''

    if (ingredient !== ''){
        ingredientsData = recipeData['ingredients'][ingredient]
    }

    var ingridient = {
        "name" : ingredient,
        "data" : ingredientsData,
    }

    return ingridient
}

async function addIngredient(item) {
    var data = await getDataFromJson(recipes_path);
    data[item.editValue.recipe][item.editValue.name] = item.editValue.value
    await writeDataToJson(data, recipes_path);
}

async function removeIngredient(recipe, ingredient) {
    var data = await getDataFromJson(recipes_path)
    delete data[recipe.recipe][ingredient.ingredient]
    await writeDataToJson(data, recipes_path);
}

app.listen(5000, () => {
    console.log("server on port 5000");
});