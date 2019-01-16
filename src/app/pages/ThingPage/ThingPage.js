import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ThingPage.css';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class ThingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thing: null,
            error: null
        }
    }

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    getThing = () => {
        return axios.get("http://localhost:8080/witcher_war_exploded/thing/" + this.props.thingId);
    };

    componentDidMount() {
        this.getThing()
            .then(response => {
                this.setState({
                    ...this.state,
                    thing: response.data
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Данные не могут быть загружены!'
                });
            });
    };

    deleteThing = () => {
        return axios.post("http://localhost:8080/witcher_war_exploded/thing/api/delete/" + this.props.thingId);
    };

    deleteThingSubmit = () => {
        this.deleteThing()
            .then(response => {
                this.setState({
                    ...this.state,
                    error: 'Предмет успешно удален'
                });
            })
            .catch(error => {

                this.setState({
                    ...this.state,
                    error: 'Сервер временно недоступен'
                });
            })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect}/>
        }
        return (
            <div className={this.props.asideMenuIsShow ? "ThingPage" : "ThingPage fullScreen"}>
                {this.state.error &&
                <div className="errorDiv">
                    {this.state.error}
                </div>
                }
                {this.state.thing &&
                <div className={!this.props.asideMenuIsShow ? "pageContent" : "pageContent pageContentNotFullScreen"}>
                    <h1>{this.state.thing.name}</h1>
                    {this.isEditor() &&
                    <button onClick={() => this.setState({
                        ...this.state,
                        redirect: '/edit/alchemyThing/' + this.state.thing.id
                    })}>Редактировать предмет</button>
                    }
                    {this.isEditor() &&
                    <button onClick={() => this.deleteThingSubmit()}>Удалить предмет</button>
                    }
                    <img
                        src={"http://localhost:8080/witcher_war_exploded/thing/" + this.state.thing.id + "/image"}/>
                    <div className="categoryDiv">
                        {this.state.thing.typeThing.name}
                    </div>
                    <div className="infoDiv">
                        <br/>
                        Цена: {this.state.thing.price}
                        <br/>
                        Вес: {this.state.thing.weight}
                        <br/>
                    </div>
                    {this.state.thing.drafts && this.state.thing.drafts.length !== 0 &&
                    <div className="draftsDiv">
                        <br/>
                        Рецепты из которых можно скрафтить:
                        <br/>
                        {this.state.thing.drafts.map((elem, index) =>
                            <div>
                                <Link to={'/draft/' + elem.id}>
                                    {index + 1} рецепт
                                </Link>
                                <br/>
                            </div>
                        )}
                    </div>
                    }
                    {this.state.thing.effects && this.state.thing.effects.length !== 0 &&
                    <div className="effectsDiv">
                        <br/>
                        Эффекты:
                        <br/>
                        <ul>
                            {this.state.thing.effects.map((elem, index) =>
                                <li>
                                    {elem.name}
                                </li>
                            )}
                        </ul>
                    </div>
                    }
                    <br/>
                    <div className="descriptionDiv">
                        {this.state.thing.descriptionThing.description}
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(ThingPage);