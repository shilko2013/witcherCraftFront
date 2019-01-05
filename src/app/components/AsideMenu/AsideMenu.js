import React, {Component} from 'react';
import './AsideMenu.css';
import LogoRef from "./LogoRef/LogoRef";
import MenuNode from "./MenuNode/MenuNode";
import searchImg from '../../resources/images/searchImg.bmp';
import loginImg from '../../resources/images/loginImage.bmp';
import CraftRef from "./CraftRef/CraftRef";
import connect from "react-redux/es/connect/connect";
import LoginNode from "./LoginNode/LoginNode";

class AsideMenu extends Component {

    isLogin = () => {
        return this.state.role !== "";
    };

    isAdmin = () => {
        return this.state.role === "USER_STATUS_ADMIN";
    };

    isEditor = () => {
        return this.state.role === "USER_STATUS_ADMIN"
            || this.state.role === "USER_STATUS_EDITOR";
    };

    isReader = () => {
        return this.state.role === "USER_STATUS_ADMIN"
            || this.state.role === "USER_STATUS_EDITOR"
            || this.state.role === "USER_STATUS_READER";
    };

    constructor(props) {
        super(props);
        this.state = {
            role: props.role,
            error: ''
        }
    }

    render() {
        console.log(this.props);
        return (
            <aside className="AsideMenu">
                <div className="top">
                    <LogoRef/>
                    <MenuNode text="Поиск" src={searchImg}/>
                    {!this.isLogin() &&
                    <LoginNode text="Войти/зарегестрироваться" src={loginImg}/>
                    }
                    {this.isLogin() &&
                    <MenuNode text="Выйти" src={loginImg}/>
                    }
                    <MenuNode text="Алхимия" nodes={["Ингридиенты", "Чертежи", "Предметы"]}/>
                    <CraftRef/>
                </div>
                <div className="bottom">
                    {this.isAdmin() &&
                    <MenuNode text="Панель управления" src={loginImg}/>
                    }
                    <MenuNode text="Сделать пожертвование" src={loginImg}/>
                    <MenuNode text="Аналитика сайта" src={loginImg}/>
                </div>
            </aside>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
    }),
    dispatch => ({})
)(AsideMenu);