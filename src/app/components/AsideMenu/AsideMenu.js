import React, {Component} from 'react';
import './AsideMenu.css';
import LogoRef from "./LogoRef/LogoRef";
import MenuNode from "./MenuNode/MenuNode";
import loginImg from '../../resources/images/loginImage.bmp';
import CraftRef from "./CraftRef/CraftRef";
import connect from "react-redux/es/connect/connect";
import LoginNode from "./LoginNode/LoginNode";
import LogoutNode from "./LogoutNode/LogoutNode";

class AsideMenu extends Component {

    isLogin = () => {
        return this.isReader();
    };

    isAdmin = () => {
        return this.props.role === "USER_STATUS_ADMIN";
    };

    isEditor = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR";
    };

    isReader = () => {
        return this.props.role === "USER_STATUS_ADMIN"
            || this.props.role === "USER_STATUS_EDITOR"
            || this.props.role === "USER_STATUS_READER";
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <aside className="AsideMenu">
                <div className="top">
                    <LogoRef/>
                    {!this.isLogin() &&
                    <LoginNode text="Войти/зарегистрироваться" src={loginImg}/>
                    }
                    {this.isLogin() &&
                    <LogoutNode text="Выйти" src={loginImg}/>
                    }
                    <MenuNode text="Алхимия" nodes={["Ингридиенты", "Рецепты", "Предметы"]}/>
                    <MenuNode text="Ремесло" nodes={["Компоненты", "Чертежи", "Предметы"]}/>
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
    })
)(AsideMenu);