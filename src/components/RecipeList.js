import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
    const [recipeList, setRecipes] = React.useState([]);

    React.useEffect(() => {
        if (recipeList === '' || recipeList === undefined)
            setRecipes(recipeList[0])

    }, [recipeList])

    React.useEffect(() => {
        async function fetchRecipeList() {
            let response = await fetch(`/recipes`);
            response = await response.json()
            setRecipes(response)
        }
        fetchRecipeList().catch((error) => console.log(error.message));
    }, []);

    async function getRecipes() {
        let response = await fetch(`/recipes`);
        response = await response.json();
        setRecipes(response);
    }

    const openRecipe = (recipe) => {
        return {
            pathname: 'recipe', state: { recipe }
        }
    };

    const removeRecipe = async function (recipe) {
        await fetch(`/removeRecipe`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipe: { recipe } })
        })
        await getRecipes();
    }

    const createTable = () => {
        let rows = [];
        for (var recipe = 0; recipe < recipeList.length; recipe++) {
            var Name = recipeList[recipe];
            rows.push(
                <tr key={recipe}>
                    <td className='col col-9 td-style'>
                        <Link to={openRecipe(Name)}>
                            <button className="btn btn-link">{Name}</button>
                        </Link>
                    </td>
                    <td className='col-3 td-style'>
                        <button className="btn btn-primary" key="removeRecope" onClick={() => removeRecipe(Name)}>Remove</button>
                    </td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <>
            <div className="m-5 form-control d-flex">
                {console.log(recipeList.length)}
                {recipeList.length === 0
                    ? <h3>Recipe list is empty</h3>
                    :
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createTable()}
                        </tbody>
                    </table>
                }

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to={openRecipe('')}>
                    <button className="btn btn-primary">Add recipe</button>
                </Link>
            </div>
        </>
    );
}

export default RecipeList;