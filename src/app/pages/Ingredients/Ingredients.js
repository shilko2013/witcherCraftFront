import React, {Component} from 'react';
import './Ingredients.css';
import connect from "react-redux/es/connect/connect";
import IngredientsTable from "../../components/IngredientsTable/IngredientsTable";

class Ingredients extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className={this.props.asideMenuIsShow ? "Ingredients" : "Ingredients fullScreen"} style={{height: this.props.height}}>
        <h1>Ингридиенты</h1>
          <IngredientsTable/>
      </div>
    )
  }
}

export default connect(
    state => ({
      asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(Ingredients);