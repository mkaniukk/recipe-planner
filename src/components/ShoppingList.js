import React, { useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const [recipesList, setRecipesList] = React.useState([]);

    const addRecipeToCart = () => {

    };

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
                            <th scope="col">Ingridient</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {recipesList.map(recipe => recipe.key)} */}
                    </tbody>
                </table>
                {/* } */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DropdownButton id="dropdown-basic-button" title="Recipes">
                    {recipesList.map((recipe) => (
                        <Dropdown.Item href="">{recipe}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <div className="m-5 form-control d-flex">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {createTable()} */}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShoppingCart;