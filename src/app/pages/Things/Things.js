import React, {Component} from 'react';
import './Things.css';
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import AlchemyThingTable from "../../components/AlchemyThingTable/AlchemyThingTable";

class Things extends Component {
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
        <div className={this.props.asideMenuIsShow ? "Things" : "Things fullScreen"}
             style={{height: this.props.height}}>
          <h1>Предметы {this.props.isAlchemy ? 'алхимии' : 'ремесла'}</h1>
          {this.isEditor() &&
          <button onClick={() => {
            this.setState({
              ...this.state,
              redirect: this.props.isAlchemy ? '/add/alchemyThing' : 'addThing'
            });
          }}>Добавить предмет</button>
          }
          <AlchemyThingTable isAlchemy={this.props.isAlchemy}/>
        </div>
    )
  }
}

export default connect(
    state => ({
      role: state.auth.role,
      asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(Things);