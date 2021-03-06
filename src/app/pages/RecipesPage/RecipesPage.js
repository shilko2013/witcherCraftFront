import React, {Component} from 'react';
import './RecipesPage.css';
import {Redirect} from "react-router-dom";
import RecipesTable from "../../components/RecipesTable/RecipesTable";
import connect from "react-redux/es/connect/connect";

class RecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isEditor = () => {
    return this.props.role === "USER_STATUS_ADMIN"
        || this.props.role === "USER_STATUS_EDITOR";
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }
    return (
        <div className={this.props.asideMenuIsShow ? "RecipesPage" : "RecipesPage fullScreen"}
             style={{height: this.props.height}}>
          <h1>{this.props.isAlchemy ? 'Рецепты' : 'Чертежи'}</h1>
          {this.isEditor() &&
          <button onClick={() => {
            this.setState({
              ...this.state,
              redirect: this.props.isAlchemy ? '/add/recipe' : '/add/draft'
            });
          }}>Добавить {this.props.isAlchemy ? 'рецепт' : 'чертеж'}</button>
          }
          <RecipesTable isAlchemy={this.props.isAlchemy}/>
        </div>
    )
  }
}

export default connect(
    state => ({
      role: state.auth.role,
      asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(RecipesPage);