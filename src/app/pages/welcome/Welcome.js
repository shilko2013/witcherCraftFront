import React, {Component} from 'react';
import './Welcome.css';
import AsideMenu from "../../components/AsideMenu/AsideMenu";
import Article from "../../components/Article/Article";

class Welcome extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="Welcome">
        <Article text={"Articleinfo"} />
        <AsideMenu/>
      </div>
    )
  }
}

export default Welcome;