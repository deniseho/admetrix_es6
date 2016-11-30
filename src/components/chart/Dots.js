import React, {PropTypes} from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

export class Dots extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            x: [],
            y: []
        };

        this.handleChange = this
            .handleChange
            .bind(this);

        this.hangleOnMouseOver = this
            .hangleOnMouseOver
            .bind(this);
            
        this.hangleOnMouseOut = this
            .hangleOnMouseOut
            .bind(this);                        
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    handleChange() {}

    hangleOnMouseOver(data) {
    }

    hangleOnMouseOut() {
    }

    render() {
        return(
          <circle cx={510} cy={10} stroke="black" strokeWidth="1" r="6" fill="tomato"
            onMouseOver={this.hangleOnMouseOver(this.props.data)} 
            onMouseOut={this.hangleOnMouseOut}></circle>
        );
    }
}

export default Dots;
