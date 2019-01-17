import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {axiosInstance} from "../../../index";

class AlchemyThingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      error: ''
    };
  }

  getThings = () => {
    return axiosInstance.get("/thing/things/"+this.props.isAlchemy);
  };

  componentDidMount() {
    this.getThings()
        .then(response => this.setState({
          ...this.state,
          things: response.data
        }))
        .catch((error) => {
          console.log(error);
          this.setState({
            ...this.state,
            error: 'Данные не могут быть загружены!'
          });
        });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }
    return (
        <div className="AlchemyThingTable">
          <div className="errorDiv">
            {this.state.error}
          </div>
          {this.state.things &&
          <table className="dataTable">
            <thead>
            <tr>
              <th>Изображение</th>
              <th>Название предмета</th>
              <th>Название категории</th>
              <th>Цена</th>
              <th>Вес</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.things.map((elem, i) =>
                  <tr onClick={() => {
                    this.setState({
                      ...this.state,
                      redirect: '/thing/' + elem.id
                    })
                  }}>
                    <td>
                      <img
                          src={"http://localhost:8080/witcher_war_exploded/thing/" + elem.id + "/image"}/>
                    </td>
                    <td>
                      {elem.name}
                    </td>
                    <td>
                      {elem.typeThing.name}
                    </td>
                    <td>
                      {elem.price}
                    </td>
                    <td>
                      {elem.weight}
                    </td>
                  </tr>
              )
            }
            </tbody>
          </table>
          }
        </div>
    )
  }
}

export default connect(
    state => ({
      role: state.auth.role
    })
)(AlchemyThingTable);