import React, { Component } from 'react';
import './App.css';
import Welcome from "./pages/welcome/Welcome";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import {Route, Switch} from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import {ID_YANDEX_METRIKA} from "./resources/ExternalResources";

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

    updateWindowDimensions= () => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.onload = this.updateWindowDimensions;
    }

  render() {
      const WelcomeWithHeight = (props) => {
          return (
              <Welcome height={this.state.windowHeight}/>
          );
      };
    return (
        <div className="rootApp">
            <YMInitializer accounts={[ID_YANDEX_METRIKA]} />
        <AsideMenu height={this.state.windowHeight}/>
            <Switch>
              <Route path='/' component={WelcomeWithHeight}/>
            </Switch>
        </div>
    );
  }
}

export default App;
