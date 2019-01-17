import React, {Component} from 'react';
import './AdminPage.css';
import connect from "react-redux/es/connect/connect";
import {Redirect} from "react-router-dom";
import {axiosInstance} from "../../../index";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isAdmin = () => {
        return this.props.role === "USER_STATUS_ADMIN";
    };

    getUsers = () => {
        return axiosInstance.get('/api/admin/users', {
            responseType: 'text',
            withCredentials: true
        });
    };

    disableSession = (username) => {
        axiosInstance.get('/api/admin/' + username + '/disable', {
            responseType: 'text',
            withCredentials: true
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    error: 'Сеанс пользователя успешно завершен'
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

    setRole = (role, username) => {
        let _role;
        switch (role) {
            case 0:
                _role = 'reader';
                break;
            case 1:
                _role = 'editor';
                break;
            case 2:
                _role = 'admin';
                break;
        }
        axiosInstance.get('/api/admin/' + username + '/' + _role, {
            responseType: 'text',
            withCredentials: true
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    error: 'Роль успешно отредактирована и будет назначена при следующем входе пользователя'
                });
                this.componentDidMount();
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Данные не могут быть загружены!'
                });
            });
    };

    componentDidMount() {
        this.getUsers()
            .then(response => {
                this.setState({
                    ...this.state,
                    users: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    error: 'Данные не могут быть загружены!'
                });
            });
    }

    userAction = () => {
        switch (this.state.action) {
            case 'Сделать читателем':
                this.setRole(0, this.state.username);
                break;
            case 'Сделать редактором':
                this.setRole(1, this.state.username);
                break;
            case 'Сделать администратором':
                this.setRole(2, this.state.username);
                break;
            case 'Завершить сеанс':
                this.disableSession(this.state.username);
                break;
            default:
                this.setState({
                    ...this.state,
                    error: 'Выберите действие'
                })
        }
    };

    render() {
        if (!this.isAdmin())
            return <Redirect push to={'/'}/>;
        return (
            <div className="AdminPage">
                <h1>Панель управления</h1>
                <div className={'errorDiv'}>
                    {this.state.error}
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.userAction();
                }}>
                    <label>Логин пользователя: </label>
                    <input required
                           value={this.state.username}
                           onChange={(event) => this.setState({
                               ...this.state,
                               username: event.target.value
                           })}/>
                    <label>Действие: </label>
                    <select required
                            value={this.state.action}
                            onChange={(event) => this.setState({
                                ...this.state,
                                action: event.target.value
                            })}>
                        <option>Сделать читателем</option>
                        <option>Сделать редактором</option>
                        <option>Сделать администратором</option>
                    </select>
                    <button type='submit'>Отправить</button>
                </form>
                <table className={'dataTable'}>
                    <thead>
                    <tr>
                        <th>Логин пользователя</th>
                        <th>Роль пользователя</th>
                        <th>Email</th>
                        <th>Назначить роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users && this.state.users.map((elem) =>
                        <tr>
                            <td>{elem.username}</td>
                            <td>{((status) => {
                                switch (status) {
                                    case 'USER_STATUS_READER':
                                        return 'Читатель';
                                    case 'USER_STATUS_EDITOR':
                                        return 'Редактор';
                                    case 'USER_STATUS_ADMIN':
                                        return 'Администратор';
                                }
                            })(elem.userStatus)
                            }
                            </td>
                            <td>{elem.email}</td>
                            <td>
                                <div onClick={() => this.setRole(0, elem.username)}>Читатель</div>
                                <div onClick={() => this.setRole(1, elem.username)}>Редактор</div>
                                <div onClick={() => this.setRole(2, elem.username)}>Администратор</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(AdminPage);