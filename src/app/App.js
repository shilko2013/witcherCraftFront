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
import ThingAddPage from "./pages/ThingAddPage/ThingAddPage";
import ThingEditPage from "./pages/ThingEditPage/ThingEditPage";
import RecipeAddPage from "./pages/RecipeAddPage/RecipeAddPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CraftPage from "./pages/CraftPage/CraftPage";

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
                <Ingredients isAlchemy={true} height={this.state.windowHeight}/>
            );
        };
        const ComponentsWithHeight = (props) => {
            return (
                <Ingredients isAlchemy={false} height={this.state.windowHeight}/>
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
                <IngredientAddPage isAlchemy={true} height={this.state.windowHeight}/>
            );
        };
        const ComponentAddPageWithHeight = (props) => {
            return (
                <IngredientAddPage isAlchemy={false} height={this.state.windowHeight}/>
            );
        };
        const RecipesPageWithHeight = (props) => {
            return (
                <RecipesPage isAlchemy={true} height={this.state.windowHeight}/>
            );
        };
        const DraftsPageWithHeight = (props) => {
            return (
                <RecipesPage isAlchemy={false} height={this.state.windowHeight}/>
            );
        };
        const AlchemyThingsWithHeight = (props) => {
            return (
                <Things isAlchemy={true} height={this.state.windowHeight}/>
            );
        };
        const ThingsWithHeight = (props) => {
            return (
                <Things isAlchemy={false} height={this.state.windowHeight}/>
            );
        };
        const ThingPageWithId = ({match}) => {
            return (
                <ThingPage thingId={match.params.id}/>
            );
        };
        const AlchemyThinkAddPageWithHeight = (props) => {
            return (
                <ThingAddPage isAlchemy={true} height={this.state.windowHeight}/>
            );
        };
        const ThinkAddPageWithHeight = (props) => {
            return (
                <ThingAddPage isAlchemy={false} height={this.state.windowHeight}/>
            );
        };
        const AlchemyThingEditPageWithId = ({match}) => {
            return (
                <ThingEditPage isAlchemy={true} thingId={match.params.id}/>
            );
        };
        const RecipeAddWithHeight = (props) => {
            return (
                <RecipeAddPage isAlchemy={true} height={this.state.windowHeight}/>
            );
        };
        const DraftAddWithHeight = (props) => {
            return (
                <RecipeAddPage isAlchemy={false} height={this.state.windowHeight}/>
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
                    <Route path='/components' component={ComponentsWithHeight}/> //
                    <Route path='/ingredient/:id' component={IngredientWithId}/>
                    <Route path='/edit/ingredient/:id' component={IngredientWithIdEdit}/>
                    <Route path='/add/ingredient' component={IngredientAddPageWithHeight}/>
                    <Route path='/add/component' component={ComponentAddPageWithHeight}/> //
                    <Route path='/recipes' component={RecipesPageWithHeight}/>
                    <Route path='/drafts' component={DraftsPageWithHeight}/>
                    <Route path='/draft/:id' component={RecipeWithId}/>
                    <Route path='/alchemyThings' component={AlchemyThingsWithHeight}/>
                    <Route path='/things' component={ThingsWithHeight}/>
                    <Route path='/thing/:id' component={ThingPageWithId}/>
                    <Route path='/add/alchemyThing' component={AlchemyThinkAddPageWithHeight}/>
                    <Route path='/addThing' component={ThinkAddPageWithHeight}/>
                    <Route path='/edit/alchemyThing/:id' component={AlchemyThingEditPageWithId}/>
                    <Route path='/add/recipe' component={RecipeAddWithHeight}/>
                    <Route path='/add/draft' component={DraftAddWithHeight}/>
                    <Route path='/admin' component={AdminPage}/>
                    <Route path='/craft' component={CraftPage}/>
                    <Route component={WelcomeWithHeight}/>
                </Switch>
            </div>
        );
    }
}

export default App;
