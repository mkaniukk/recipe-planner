import { merge } from 'jquery';
import React, { useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const [recipesList, setRecipesList] = React.useState([]);
    const [shoppingList, setShoppingList] = React.useState([]);
    const [ingredientsList, setIngredientsList] = React.useState({});

    const addRecipeToCart = async (recipe) => {
        let response = await fetch(`/recipe?recipe=${recipe}`)
        response = await response.json()
        addToShoppingList(response);
        addIngredientsToList(response.ingredients);
    };

    const addToShoppingList = (recipe) => {
        // Increment amount of recipe if repeated
        for (let r in shoppingList) {
            if (shoppingList[r]['name'] === recipe.name) {
                let newList = shoppingList;
                newList[r]['amount'] += 1;
                setShoppingList([...newList]);
                return;
            }
        }
        // Add new recipe
        recipe['amount'] = 1;
        setShoppingList((shoppingList) => ([...shoppingList, recipe]));
    }

    const removeFromShoppingList = (recipe) => {
        // Decrement amount of recipe if repeated
        for (let recipeIterator in shoppingList) {
            if (shoppingList[recipeIterator]['name'] === recipe.name) {
                removeIngredientsFromList(recipe.ingredients);
                let newList = shoppingList;
                // Decrement value
                if (shoppingList[recipeIterator]['amount'] !== 1) {
                    newList[recipeIterator]['amount'] -= 1;

                    // Delete recipe
                } else {
                    newList.splice(recipeIterator, 1);
                }
                setShoppingList([...newList]);
            }
        }
    }

    const addIngredientsToList = (ingredients) => {
        // Add ingridients to list
        let newList = {...ingredientsList};
        for (let ingredient in ingredients) {
                // Change amount if it exists
            if (ingredient in ingredientsList && compareUnits(ingredientsList[ingredient], ingredients[ingredient])){
                newList[ingredient] = (parseFloat(ingredientsList[ingredient].split(' ')[0]) + parseFloat(ingredients[ingredient].split(' ')[0])).toString() + " " + ingredientsList[ingredient].split(' ')[1];
                setIngredientsList({...newList});
            }else{
                // If ingridient does not exist
                newList[ingredient] = ingredients[ingredient];
            }
        }
        setIngredientsList({...newList});
    }

    const removeIngredientsFromList = (ingredients) => {
        // Add ingridients to list
        let newList = {...ingredientsList};
        for (let ingredient in ingredients) {
                // Change amount if it exists
            if (ingredient in ingredientsList && compareUnits(ingredientsList[ingredient], ingredients[ingredient])){
                newList[ingredient] = (parseFloat(ingredientsList[ingredient].split(' ')[0]) - parseFloat(ingredients[ingredient].split(' ')[0])).toString() + " " + ingredientsList[ingredient].split(' ')[1];
                if((parseFloat(ingredientsList[ingredient].split(' ')[0]) - parseFloat(ingredients[ingredient].split(' ')[0])).toString() === '0')
                    delete newList[ingredient];
                else    
                    setIngredientsList({...newList});
            }
        }
        setIngredientsList({...newList});
    }


    const compareUnits = (first, second) => {
        if(first.split(' ')[1] === second.split(' ')[1])
            return true;
        else
            return false;
    }

    const createIngredientsTable = () => {
        let ingredientsTable = []
        for (let ingredient in ingredientsList) {
            ingredientsTable.push(
                <tr key={ingredient}>
                    <td>
                        {ingredient}
                    </td>
                    <td>
                        {ingredientsList[ingredient].split(' ')[0]}
                    </td>
                    <td>
                        {ingredientsList[ingredient].split(' ')[1]}
                    </td>
                </tr>
            );
        }
        return ingredientsTable
    }

    React.useEffect(() => {
        async function fetchRecipeList() {
            let response = await fetch(`/recipes`);
            response = await response.json()
            setRecipesList(response)
        }
        fetchRecipeList().catch((error) => console.log(error.message));
    }, []);

    return (
        <>
            <div className="m-5 form-control d-flex">
                {/*
                {recipeList.length === 0
                    ? <h3>Recipe list is empty</h3>
                    : */}
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Ingredient</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createIngredientsTable()}
                    </tbody>
                </table>
                {/* } */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DropdownButton id="dropdown-basic-button" title="Recipes">
                    {recipesList.map((recipe) => (
                        <Dropdown.Item onClick={() => addRecipeToCart(recipe)}>{recipe}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <div className="m-5 form-control d-flex">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoppingList.map((recipe) => (
                            <tr>
                                <th>
                                    {recipe.name}
                                </th>
                                <th>
                                    {recipe.amount}
                                </th>
                                <th>
                                    <button className="btn btn-danger" onClick={() => removeFromShoppingList(recipe)}>Remove</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShoppingCart;