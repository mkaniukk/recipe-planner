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
        for (let r in shoppingList) {
            if (shoppingList[r]['name'] === recipe.name) {
                let newList = shoppingList;

                // Decrement value
                if (shoppingList[r]['amount'] !== 1) {
                    newList[r]['amount'] -= 1;

                // Delete recipe
                } else {
                    newList.splice(r, 1);
                }
                setShoppingList([...newList]);
            }
        }
    }

    const addIngredientsToList = (ingredients) => {
        // Add ingridients to list
        // If ingridient does not exist
        // And change amount if it does
        for (let ingredient in ingredients) {
            if (ingredient in ingredientsList)
                ingredientsList[ingredient].split(' ')[0] = (parseInt(ingredientsList[ingredient].split(' ')[0]) + parseInt(ingredients[ingredient].split(' ')[0])).toString();
            else
                setIngredientsList((ingredientsList) => ({ ...ingredientsList, ...ingredients }));
        }
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