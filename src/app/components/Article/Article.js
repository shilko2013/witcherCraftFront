import React, {Component} from 'react';
import './Article.css';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {text : props.text};
    }

    render() {
        return (
            <div className="Article">
                {this.state.text}
            </div>
        )
    }
}

export default Article;