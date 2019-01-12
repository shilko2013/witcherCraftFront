import React, {Component} from 'react';
import './AsideMenu.css';
import LogoRef from "./LogoRef/LogoRef";
import MenuNode from "./MenuNode/MenuNode";
import loginImg from '../../resources/images/loginImage.bmp';
import CraftRef from "./CraftRef/CraftRef";
import connect from "react-redux/es/connect/connect";
import LoginNode from "./LoginNode/LoginNode";
import LogoutNode from "./LogoutNode/LogoutNode";
import {ACCOUNT_NUMBER, AMOUNT, COMMENT, ID_YANDEX_METRIKA} from "../../resources/ExternalResources";
import {switchShow} from "../../actions/InterfaceActions";

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
            <div>
                <aside className={this.props.isShow ? 'AsideMenu' : 'AsideMenu isHidden'}
                style={{height: this.props.height}}>
                    <LogoRef/>
                    {!this.isLogin() &&
                    <LoginNode text="Вход/регистрация" src={loginImg}/>
                    }
                    {this.isLogin() &&
                    <LogoutNode text="Выйти" src={loginImg}/>
                    }
                    <MenuNode text="Алхимия"
                              nodes={["Ингридиенты", "Рецепты", "Предметы"]}
                              nodeHrefs={["/ingredients", "2", "3"]}/>
                    <MenuNode text="Ремесло"
                              nodes={["Компоненты", "Чертежи", "Предметы"]}
                              nodeHrefs={["4", "5", "6"]}/>
                    <CraftRef/>
                    {this.isAdmin() &&
                    <MenuNode text="Панель управления"
                              href="/admin"/>
                    }
                    <MenuNode text="Сделать пожертвование"
                              isExternal={true}
                              href={
                                  "https://qiwi.com/payment/form/" +
                                  "99?extra%5B%27account%27%5D=" + ACCOUNT_NUMBER +
                                  "&amountInteger=" + AMOUNT +
                                  "&extra%5B%27comment%27%5D=" + COMMENT +
                                  "&currency=643&blocked[0]=account&blocked[1]=comment"
                              }/>
                    <MenuNode text="Аналитика сайта"
                              isExternal={true}
                              href={"https://metrika.yandex.ru/dashboard?id=" + ID_YANDEX_METRIKA}/>
                </aside>
                <button className={this.props.isShow ? "hideButton" : "hideButton buttonMenuIsHidden"}
                        onClick={this.props.switchShow}>⚔
                </button>
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        isShow: state.interface.asideMenuIsShow
    }),
    dispatch => ({
        switchShow: () => {
            dispatch(switchShow());
        }
    })
)(AsideMenu);