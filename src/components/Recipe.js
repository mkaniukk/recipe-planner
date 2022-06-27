import React from 'react';
import {Link} from "react-router-dom";

function Recipe(props) {
    const [recipe, setRecipe] = React.useState([]);

    React.useEffect(() => {
        function setDefault() {
            if (recipe !== undefined && recipe.length !== 0) {
                setRecipe(recipe);
            } else {
                setRecipe('');
            }
        }
        setDefault();

    }, [recipe])

    React.useEffect(() => {
        async function fetchRecipe() {
            let response = await fetch(`/recipe?recipe=${props.location.state.recipe}`)
            response = await response.json()
            setRecipe(response)
        }

        fetchRecipe()
    }, [])

    async function getRecipe() {
        let response = await fetch(`/recipe?recipe=${props.location.state.recipe}`)
        response = await response.json()
        setRecipe(response)
    }

    const saveRecipe = async function () {
        var name = document.getElementById("name").value;
        var text = document.getElementById("text").value;

        if (name === '' || text === '') {
            return props.history.push({ pathname: 'recipe', state: { recipe: props.location.state.recipe } });
        }

        var recipe = {
            'name' : name,
            'text' : text
        }

        await addRecipe(recipe);
    }

    const addRecipe = async function (item) {
        await fetch(`/addRecipe`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: {item}})
        }).then(() => {
            props.history.push({ pathname: '/'});
        });
    }

    const openIngredient = (recipe, ingredient) => {
        var name = document.getElementById("name").value;
        var text = document.getElementById("text").value;

        if (name === '' || text === '') {
            return props.history.push({ pathname: 'name', state: { recipe: props.location.state.recipe } });
        }

        if (props.location.state.recipe === '' && "name" !== ''){
            saveRecipe().then(() =>
                props.history.push({ pathname: 'getIngredient', state: { recipe: name, ingredient: '' }}));
        }
        else {
            return props.history.push({pathname: 'getIngredient', state: { recipe, ingredient }});
        }
    };

    const removeIngredient = async function (recipe, ingredient) {
        await fetch(`/removeIngredient`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipe: {recipe}, ingredient: {ingredient} })
        })
        await getRecipe();
    }

    const createIngredientsTable = () => {
        let ingridientsTable = []
        var data =  recipe['ingredients'];
        for(let ingredient in data) {
            ingridientsTable.push(
                <tr key={ingredient}>
                    <td>
                        {ingredient}
                    </td>
                    <td>
                        {data[ingredient].split(' ')[0]}
                    </td>
                    <td>
                        {data[ingredient].split(' ')[1]}
                    </td>
                    <td>
                        <button className="btn btn-primary" key="removeIngredient" onClick={() => removeIngredient(props.location.state.recipe, ingredient)}>Remove</button>
                    </td>
                </tr>
            );
        }
        return ingridientsTable
    }

    return (
        <div>
            <div className="form-control m-5 d-flex p-1">
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <th scope="row" className="col-3">
                            <label>Recipe:</label>
                        </th>
                        <td className="col-9">
                            <textarea className="form-control" id="name" value={recipe.name} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label>Recipe Text:</label>
                        </th>
                        <td>
                            <textarea className="form-control flex h-auto" id="text" rows="7" defaultValue={recipe.recipe} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label>Ingredients:</label>
                        </th>
                        <td>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className='col-4'>Name</th>
                                        <th scope="col" className='col-3'>Amount</th>
                                        <th scope="col" className='col-2'>Unit</th>
                                        <th scope="col" className='col-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {createIngredientsTable()}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <th colSpan={2}>
                <button className="btn btn-primary" key="save" onClick={() => openIngredient(recipe.name, '')}>Add ingredient</button>
                <Link to={'/'}>
                    |<button className="btn btn-primary">Cancel</button>|
                </Link>
                <button className="btn btn-primary" key="save" onClick={() => saveRecipe()}>Save</button>
            </th>
        </div>
    </div>
    );

}

export default Recipe;