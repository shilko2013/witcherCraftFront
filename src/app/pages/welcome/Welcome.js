import React, {Component} from 'react';
import './Welcome.css';
import AsideMenu from "../../components/AsideMenu/AsideMenu";

class Welcome extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="Welcome">
        <AsideMenu/>
          <h1>Article info</h1>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
          Куча текста текста текста текста текста текста текста <br/>
      </div>
    )
  }
}

export default Welcome;