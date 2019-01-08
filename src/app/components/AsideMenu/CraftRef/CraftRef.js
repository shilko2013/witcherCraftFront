import React, {Component} from 'react';
import './CraftRef.css';
import craftImg from '../../../resources/images/craftImg.bmp'
import {Link} from 'react-router-dom';

class CraftRef extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CraftRef">
                <Link to="/craft">
                    <img
                        id="image"
                        src={craftImg}
                        alt="craftImage"
                    />
                </Link>
            </div>
        )
    }
}

export default CraftRef;