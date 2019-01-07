import React, {Component} from 'react';
import './LogoRef.css';
import logo from '../../../resources/images/logo2.png'
import {Link} from 'react-router-dom';

class LogoRef extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LogoRef">
                <Link to="/">
                <img
                    id="logo"
                    src={logo}
                    alt="logo"
                />
                </Link>
            </div>
        )
    }
}

export default LogoRef;