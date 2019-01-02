import React, {Component} from 'react';
import './AsideMenu.css';
import LogoRef from "./LogoRef/LogoRef";
import MenuNode from "./MenuNode/MenuNode";
import searchImg from '../../resources/images/searchImg.bmp';
import loginImg from '../../resources/images/loginImage.bmp';
import CraftRef from "./CraftRef/CraftRef";
import connect from "react-redux/es/connect/connect";
import {store} from "../../redux/storeManager";
import {AuthActions} from "../../redux/api/AuthService";

class AsideMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        store.dispatch({type: AuthActions.AUTH_LOGIN, username: "adminnnn", password: "iaq15000"});
        console.log(this.props);
        return (
            <aside className="AsideMenu">
                <div className="top">
                    <LogoRef/>
                    <MenuNode text="Поиск" src={searchImg}/>
                    <MenuNode text="Войти/зарегестрироваться" src={loginImg}/>
                    <MenuNode text="Алхимия" nodes={["Ингридиенты", "Чертежи", "Предметы"]}/>
                    <CraftRef/>
                </div>
                <div className="bottom">
                    <MenuNode text="Панель управления" src={loginImg}/>
                    <MenuNode text="Сделать пожертвование" src={loginImg}/>
                    <MenuNode text="Аналитика сайта" src={loginImg}/>
                </div>
            </aside>
        )
    }
}

export default connect(
    state => ({
        role: state.auth
    }),
    dispatch => ({})
)(AsideMenu);