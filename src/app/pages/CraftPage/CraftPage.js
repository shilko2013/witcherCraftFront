import React, {Component} from 'react';
import './CraftPage.css';
import connect from "react-redux/es/connect/connect";
import CraftTree from "../../components/CraftTree/CraftTree";

class CraftPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlchemy: true
        }
    }

    render() {
        return (
            <div className={this.props.asideMenuIsShow ? "CraftPage" : "CraftPage fullScreen"}>
                <h1>Дерево крафта</h1>
                <label>Выберите область, для которой нужно построить диаграмму</label>
                <br/>
                <select required
                        onChange={(event) => this.setState({
                            ...this.state,
                            isAlchemy: event.target.value === 'Алхимия'
                        })}>
                    <option selected={true}>Алхимия</option>
                    <option>Ремесло</option>
                </select>
                <CraftTree isAlchemy={this.state.isAlchemy}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        role: state.auth.role,
        asideMenuIsShow: state.interface.asideMenuIsShow
    })
)(CraftPage);