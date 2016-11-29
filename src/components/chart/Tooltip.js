import React, {PropTypes} from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

export class Tooltip extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {}

    handleChange() {}

    render() {
        return(
            <div className="tooltip" style={{opacity:1}}>
            
            </div>
        );
    }
}

export default Tooltip;
