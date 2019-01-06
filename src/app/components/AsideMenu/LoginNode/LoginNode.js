import React, {Component} from 'react';
import './LoginNode.css';
import defaultImg from "../../../resources/images/defaultImg.bmp";
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {login} from "../../../actions/AuthActions";

class LoginNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: true,
            username: '',
            password: '',
            email: '',
            error: '',
            text: this.props.text,
            wasClicked: ''
        };
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => {
        const LoginNodeElement = document.getElementsByClassName('LoginNode')[0];
        if (!event.path.includes(LoginNodeElement)) {
            this.setState({
                ...this.state,
                wasClicked: ''
            })
        }
    };

    loginOrRegister = () => {
        if (this.state.isLoginForm) {
            let params = new URLSearchParams();
            params.append('username', this.state.username);
            params.append('password', this.state.password);

            axios.post('http://localhost:8080/witcher_war_exploded/login', params, {
                responseType: 'text'
            }).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        ...this.state,
                        error: 'Вы успешно вошли в систему!'
                    });
                    setTimeout(() => {
                        this.props.login(response.headers.role);
                        console.log(response.headers.role);
                    }, 1500);
                } else throw Error('error');
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    this.setState({
                        ...this.state,
                        error: 'Неверный логин или пароль, повторите ввод!'
                    });
                    return;
                }
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Похоже на сервере неполадки, пожалуйста, повторите попытку позже!'
                });
            });
        } else {
            let params = new URLSearchParams();
            params.append('username', this.state.username);
            params.append('password', this.state.password);
            params.append('email', this.state.email);

            axios.post('http://localhost:8080/witcher_war_exploded/registration', params, {
                responseType: 'text'
            }).then((response) => {
                if (response.status === 200)
                    this.setState({
                        ...this.state,
                        error: 'Вы успешно зарегестрированы!'
                    });
                else throw Error('error');
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    let errorReason;
                    switch (error.response.data) {
                        case "Size username":
                            errorReason = 'Длина логина должна быть от 8 до 32 символов';
                            break;
                        case "Duplicate username":
                            errorReason = 'Пользователь с таким именем уже существует';
                            break;
                        case "Invalid username":
                            errorReason = 'Логин может включать в себя только латинские буквы и цифры';
                            break;
                        case "Invalid password":
                            errorReason = 'Пароль может включать в себя только латинские буквы и цифры';
                            break;
                        case "Size password":
                            errorReason = 'Длина пароля должна быть от 8 до 32 символов';
                            break;
                        case "Invalid email":
                            errorReason = 'Такого email не существует';
                            break;
                        case "Duplicate email":
                            errorReason = 'Пользователь с таким email уже существует';
                            break;
                        default:
                            errorReason = 'Данные неверны';
                            break;
                    }
                    this.setState({
                        ...this.state,
                        error: errorReason
                    });
                    return;
                }
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Похоже на сервере неполадки, пожалуйста, повторите попытку позже!'
                });
            });
        }
    };

    render() {
        return (
            <div className="LoginNode">
                <div className="textPart" onClick={() => {
                    this.setState({
                        ...this.state,
                        wasClicked: this.state.wasClicked === '' ? 'clicked' : ''
                    });
                }}>
                    <img
                        src={this.state.src || defaultImg}
                        alt=""/>
                    <div className="nodeText unselectable">
                        {this.state.text}
                    </div>
                </div>
                <br/>
                <form className={'LoginForm ' + this.state.wasClicked} onSubmit={(event) => {
                    event.preventDefault();
                    this.loginOrRegister();
                }}>
                    <label htmlFor="username">Логин: </label>
                    <input onChange={(event) => {
                        this.setState({...this.state, username: event.target.value})
                    }} type="text" id="username"/>
                    <br/>
                    <label htmlFor="password">Пароль: </label>
                    <input onChange={(event) => {
                        this.setState({...this.state, password: event.target.value})
                    }} type="password" id="password"/>
                    <br/>
                    {!this.state.isLoginForm &&
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input onChange={(event) => {
                            this.setState({...this.state, email: event.target.value})
                        }} type="text" id="email"/>
                        <br/>
                    </div>
                    }
                    <span className="errorDiv">
                        {this.state.error}
                    </span>
                    <div className="buttonDiv">
                        <button type="submit">{this.state.isLoginForm ? "Войти" : "Зарегестрироваться"}</button>
                        <br/>
                        <button onClick={(event) => {
                            event.preventDefault();
                            this.setState({
                                ...this.state,
                                isLoginForm: !this.state.isLoginForm,
                                error: ''
                            })
                        }}>
                            {this.state.isLoginForm ? "Еще не зарегестрированы?" : "Уже зарегестрированы?"}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
    }),
    dispatch => ({
        login: (role) => {
            dispatch(login(role));
        }
    })
)(LoginNode);