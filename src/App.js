import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { withRouter } from 'react-router';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import Ingredient from "./components/Ingredient";
import Layout from './components/Layout'
import ShoppingList from './components/ShoppingList';

function App(props) {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {props.children}
          <Route exact path='/' component={withRouter(RecipeList)} />
          <Route path='/recipe' component={withRouter(Recipe)} />
          <Route path='/getIngredient' component={withRouter(Ingredient)} />
          <Route path='/shoppingList' component={withRouter(ShoppingList)} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
