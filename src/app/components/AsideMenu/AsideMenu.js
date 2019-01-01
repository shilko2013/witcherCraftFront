import React, {Component} from 'react';
import './AsideMenu.css';
import LogoRef from "./LogoRef/LogoRef";
import MenuNode from "./MenuNode/MenuNode";
import searchImg from '../../resources/images/searchImg.bmp';
import loginImg from '../../resources/images/loginImage.bmp';
import CraftRef from "./CraftRef/CraftRef";

class AsideMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="AsideMenu">
                <div className="top">
                    <LogoRef/>
                    <MenuNode text="Search" src={searchImg}/>
                    <MenuNode text="Login" src={loginImg}/>
                    <MenuNode text="Alchemy" nodes={["Ингридиенты", "Чертежи", "Предметы"]}/>
                    <CraftRef/>
                </div>
                <div className="bottom">
                </div>
            </aside>
        )
    }
}

export default AsideMenu;