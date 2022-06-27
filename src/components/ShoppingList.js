import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const [recipesList, setRecipesList] = React.useState([]);

    const addRecipeToCart = () => {

    };

    const getRecipes = () => {

    };

    React.useEffect(() => {



    }, []);

    return (
        <>
            <div className="m-5 form-control d-flex">
                {/* {console.log(recipeList.length)}
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
                            {/* {createTable()} */}
                        </tbody>
                    </table>
                {/* } */}

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Action
                    </button>
                    <ul class="dropdown-menu">
                        {getRecipes()}
                    </ul>
                </div>
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