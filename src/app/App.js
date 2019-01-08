import React, { Component } from 'react';
import './App.css';
import Welcome from "./pages/welcome/Welcome";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import {Route, Switch} from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import {ID_YANDEX_METRIKA} from "./resources/ExternalResources";

class App extends Component {
  render() {
    return (
        <div className="rootApp">
            <YMInitializer accounts={[ID_YANDEX_METRIKA]} />
        <AsideMenu/>
            <Switch>
              <Route path='/' component={Welcome}/>
            </Switch>
        </div>
    );
  }
}

export default App;
