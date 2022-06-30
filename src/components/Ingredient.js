import React from 'react';
import {Link} from "react-router-dom";

function Ingredient(props) {
    const [ingredient, setIngredient] = React.useState('');

    React.useEffect(() => {
        function setDefault() {
            if (ingredient !== undefined && ingredient.length !== 0) {
                setIngredient(ingredient);
            }
        }
        setDefault();
    }, [ingredient])

    React.useEffect(() => {
        async function fetchIngredient() {
            let response = await fetch(`/getIngredient?recipe=${props.location.state.recipe}&ingredient=${props.location.state.ingredient}`)
            response = await response.json()
            setIngredient(response)
        }

        fetchIngredient()
    }, [])

    const saveIngredient = async function () {
        var name = document.getElementById("Name").value;
        var amount = document.getElementById("Amount").value;
        var unit = document.getElementById("Unit").value;

        if (name === '' || amount === ''  || unit === '') {
            return props.history.push({ pathname: 'getIngredient', state: { recipe: props.location.state.recipe, ingredient: props.location.state.ingredient } });
        }

        var ingridient = {
            'recipe' : props.location.state.recipe,
            'name' : name,
            'value' : amount.concat(' ', unit)
        }

        await addIngredient(ingridient);
    }

    const addIngredient = async function (ingridient) {
        await fetch(`/addIngredient`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: {editValue: ingridient}})
        }).then(() => {
            props.history.push({ pathname: 'recipe', state: { recipe: props.location.state.recipe }});
        });
    }

    const createIngridient = () => {
        let ing = []

        if (ingredient !== undefined && ingredient.length !== 0){

            ing.push(
                <tbody>
                    <tr key='name'>
                        <th scope="row">
                            <label>Recipe:</label>
                        </th>
                        <td >
                            <textarea className='input-data form-control' readOnly value={props.location.state.recipe}/>
                        </td>
                    </tr>
                    <tr key='ingredient'>
                        <th scope="row">
                            <label>Ingredient:</label>
                        </th>
                        <td>
                            <textarea className='input-data form-control' id="Name" defaultValue={props.location.state.ingredient}/>
                        </td>
                    </tr>
                    <tr key='amount'>
                        <th scope="row">
                            <label>Amount:</label>
                        </th>
                        <td>
                            <input className="input-data form-control" type="number" id="Amount" name="Amount" step="0.1" inputMode="decimal" defaultValue={ingredient['data'].split(' ')[0]}/>
                        </td>
                    </tr>
                    <tr key='unit'>
                        <th scope="row">
                            <label>Unit:</label>
                        </th>
                        <td>
                            <textarea className="input-data form-control" id="Unit" name="Unit" rows="1" cols="50" defaultValue={ingredient['data'].split(' ')[1]}/>
                        </td>
                    </tr>
                </tbody>
            );
        }

        return ing
    }

    return (
        <div>
            <div className="form-control m-5 d-flex p-1">
                <table className="table table-hover">
                    {createIngridient()}
                </table>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div className="btn-group justify-content-center" role="group" aria-label="Basic example">
                    <button className="btn btn-success" key="save" onClick={() => saveIngredient()}>Add</button>
                    <Link to={{pathname: 'recipe', state: {recipe: props.location.state.recipe}}}>
                        <button className="btn  btn-warning">Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default Ingredient;