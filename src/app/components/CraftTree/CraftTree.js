import React, {Component} from 'react';
import './CraftTree.css';
import {axiosInstance} from "../../../index";
import { Graph } from 'react-d3-graph';

class CraftTree extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    makeData = () => {
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
        const data = {
            links: [],
            nodes: [{id:'-1'}]
        };
        this.state.thingsData.map(thing => {
            const thingId = thing.id + 'T';
            data.links.push({source: '-1', target: thingId});
            data.nodes.push({
                id: thingId,
                name: thing.name,
                type: thing.typeThing.name,
                price: thing.price
            });
            thing.drafts.map((draft,index) => {
                const draftId = draft.id + 'D';
                data.links.push({source: thingId, target: draftId});
                data.nodes.push({
                    id: draftId,
                    name: (index + 1) + ' рецепт'
                });
                draft.components.map((component) => {
                    const componentId = component.id + 'C';
                    data.links.push({source: draftId, target: componentId});
                    const componentItem = {
                        id: componentId,
                        name: component.name,
                        category: component.categoryComponent.name,
                        price: component.price,
                    };
                    if (!data.nodes.includes(componentItem))
                        data.nodes.push(componentItem);
                })
            })
        });
        this.setState({
            ...this.state,
            data: data
        })
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isAlchemy !== prevProps.isAlchemy)
        this.loadData();
    }

    render() {
        const graphConfig = {
            "automaticRearrangeAfterDropNode": false,
            "collapsible": false,
            "directed": false,
            "height": 400,
            "highlightDegree": 1,
            "highlightOpacity": 1,
            "linkHighlightBehavior": false,
            "maxZoom": 8,
            "minZoom": 0.1,
            "focusZoom": 1,
            "focusAnimationDuration": 0.75,
            "nodeHighlightBehavior": false,
            "panAndZoom": false,
            "staticGraph": false,
            "width": 800,
            "d3": {
                "alphaTarget": 0.05,
                "gravity": -100,
                "linkLength": 100,
                "linkStrength": 1
            },
            "node": {
                "color": "#d3d3d3",
                "fontColor": "black",
                "fontSize": 8,
                "fontWeight": "normal",
                "highlightColor": "SAME",
                "highlightFontSize": 8,
                "highlightFontWeight": "normal",
                "highlightStrokeColor": "SAME",
                "highlightStrokeWidth": 1.5,
                "labelProperty": "id",
                "mouseCursor": "pointer",
                "opacity": 1,
                "renderLabel": true,
                "size": 200,
                "strokeColor": "none",
                "strokeWidth": 1.5,
                "svg": "",
                "symbolType": "circle"
            },
            "link": {
                "color": "#d3d3d3",
                "highlightColor": "#d3d3d3",
                "mouseCursor": "pointer",
                "opacity": 1,
                "semanticStrokeWidth": false,
                "strokeWidth": 1.5
            }
        };
        return (
            <div className="CraftTree">
                <div className={'errorDiv'}>
                    {this.state.error}
                </div>
                <div className="TreeDiv">
                    {this.state.data &&
                    <Graph id="graph" config={graphConfig} data={this.state.data}/>
                    }
                </div>
            </div>
        )
    }
}

export default CraftTree;