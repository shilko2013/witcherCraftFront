import React, {Component} from 'react';
import './CraftRef.css';
import craftImg from '../../../resources/images/craftImg.bmp'

class CraftRef extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CraftRef">
                <img
                    id="image"
                    src={craftImg}
                    alt="craftImage"
                />
            </div>
        )
    }
}

export default CraftRef;