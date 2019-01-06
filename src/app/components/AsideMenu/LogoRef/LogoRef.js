import React, {Component} from 'react';
import './LogoRef.css';
import logo from '../../../resources/images/logo.png'

class LogoRef extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LogoRef">
                <img
                    id="logo"
                    src={logo}
                    alt="logo"
                />
            </div>
        )
    }
}

export default LogoRef;