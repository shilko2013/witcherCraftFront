import React, {Component} from 'react';
import './CraftTree.css';
import {axiosInstance} from "../../../index";

class CraftTree extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    makeData = () => {
        const thingsData = this.state.thingsData;
        /*this.setState({
            ...this.state,
            data: {
                name: 'Вещи',
                children: thingsData.map(elem => {
                    return {
                        id: elem.id,
                        name: elem.name,
                        type: elem.typeThing.name,
                        price: elem.price,
                        weight: elem.weight,
                        description: elem.descriptionThing.description,
                        children: elem.drafts.map((el, index) => {
                            return {
                                id: el.id,
                                name: (index + 1) + ' рецепт',
                                information: el.information,
                                children: el.components.map(element => {
                                    return {
                                        id: element.id,
                                        name: element.name,
                                        category: element.categoryComponent.name,
                                        price: element.price,
                                        weight: element.weight,
                                        description: element.descriptionComponent.description
                                    }
                                })
                            }
                        })
                    };
                })
            }
        })*/

    };

    loadData = () => {
        axiosInstance.get('/craft/trees/' + this.props.isAlchemy, {
            responseType: 'text',
            withCredentials: true
        }).then(response => {
            this.setState({
                ...this.state,
                thingsData: response.data
            });
            this.makeData();
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                this.setState({
                    ...this.state,
                    error: error.response.data
                });
                return;
            }
            this.setState({
                ...this.state,
                error: 'Данные не могут быть загружены!'
            });
        })
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div className="CraftTree">
                <div className={'errorDiv'}>
                    {this.state.error}
                </div>
                <div className="TreeDiv">
                    {this.state.data &&
                    <Tree data={this.state.data} orientation='vertical'/>
                    }
                </div>
            </div>
        )
    }
}

export default CraftTree;