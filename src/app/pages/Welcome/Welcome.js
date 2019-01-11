import React, {Component} from 'react';
import './Welcome.css';
import connect from "react-redux/es/connect/connect";

class Welcome extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className={this.props.asideMenuIsShow ? "Welcome" : "Welcome fullScreen"} style={{height: this.props.height}}>
          <h1>Главная</h1>
          <p>
            Данный фан-сервис посвящен игре Ведьмак 3.<br/>
            Здесь вы можете ознакомится с основными рецептами крафта,
            ингридиентами,<br/>
            а также отредактировать что-либо, если имеете соответствующие права.
            <br/>
            Также просим поддержать проект :)
          </p>
      </div>
    )
  }
}

export default connect(
    state => ({
    asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(Welcome);