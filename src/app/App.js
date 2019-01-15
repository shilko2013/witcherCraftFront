import React, {Component} from 'react';
import './App.css';
import Welcome from "./pages/Welcome/Welcome";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import {Route, Switch} from 'react-router-dom';
import {YMInitializer} from 'react-yandex-metrika';
import {ID_YANDEX_METRIKA} from "./resources/ExternalResources";
import Favicon from "react-favicon";
import logoImg from './resources/images/logo.png';
import Ingredients from './pages/Ingredients/Ingredients';
import IngredientPage from "./pages/IngredientPage/IngredientPage";
import IngredientEditPage from "./pages/IngredientEditPage/IngredientEditPage";
import IngredientAddPage from "./pages/IngredientAddPage/IngredientAddPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import Recipe from "./pages/Recipe/Recipe";
import Things from "./pages/Things/Things";
import ThingPage from "./pages/ThingPage/ThingPage";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0,
        };
        this.updateWindowDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.onload = this.updateWindowDimensions;
        document.title = "WitcherProject";
    }

    render() {
        const WelcomeWithHeight = (props) => {
            return (
                <Welcome height={this.state.windowHeight}/>
            );
        };
        const IngredientsWithHeight = (props) => {
            return (
                <Ingredients height={this.state.windowHeight}/>
            );
        };
        const IngredientWithId = ({match}) => {
            return (
                <IngredientPage ingredientId={match.params.id}/>
            );
        };
        const IngredientWithIdEdit = ({match}) => {
            return (
                <IngredientEditPage ingredientId={match.params.id}/>
            );
        };
        const RecipeWithId = ({match}) => {
            return (
                <Recipe draftId={match.params.id}/>
            );
        };
        const IngredientAddPageWithHeight = (props) => {
            return (
                <IngredientAddPage height={this.state.windowHeight}/>
            );
        };
        const RecipesPageWithHeight = (props) => {
            return (
                <RecipesPage height={this.state.windowHeight}/>
            );
        };
        const ThingsWithHeight = (props) => {
            return (
                <Things height={this.state.windowHeight}/>
            );
        };
        const ThingPageWithId = ({match}) => {
            return (
                <ThingPage thingId={match.params.id}/>
            );
        };
        return (
            <div className="rootApp">
                <Favicon url={[logoImg]}/>
                <YMInitializer accounts={[ID_YANDEX_METRIKA]}/>
                <AsideMenu height={this.state.windowHeight} width={this.state.windowWidth}/>
                <Switch>
                    <Route exact path='/' component={WelcomeWithHeight}/>
                    <Route path='/ingredients' component={IngredientsWithHeight}/>
                    <Route path='/ingredient/:id' component={IngredientWithId}/>
                    <Route path='/edit/ingredient/:id' component={IngredientWithIdEdit}/>
                    <Route path='/add/ingredient' component={IngredientAddPageWithHeight}/>
                    <Route path='/recipes' component={RecipesPageWithHeight}/>
                    <Route path='/draft/:id' component={RecipeWithId}/>
                    <Route path='/alchemyThings' component={ThingsWithHeight}/>
                    <Route path='/thing/:id' component={ThingPageWithId}/>
                    <Route component={WelcomeWithHeight}/>
                </Switch>
            </div>
        );
    }
}

export default App;
