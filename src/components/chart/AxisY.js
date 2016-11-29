import React, {PropTypes} from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

export class AxisX extends React.Component {
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
        return (
            <g
                fill="none"
                fontSize="10"
                fontFamily="sans-serif"
                textAnchor="end"
                className="y-axis"
                transform="translate(50, 0)">
                <path className="domain" stroke="#000" d="M-6,450.5H0.5V10.5H-6"></path>
                <g className="tick" opacity="1" transform="translate(0,450)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">0</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,411.7391304347826)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">2</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,373.47826086956525)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">4</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,335.2173913043478)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">6</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,296.95652173913044)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">8</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,258.69565217391306)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">10</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,220.43478260869566)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">12</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,182.17391304347825)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">14</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,143.91304347826087)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">16</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,105.65217391304344)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">18</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,67.39130434782612)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">20</text>
                </g>
                <g className="tick" opacity="1" transform="translate(0,29.13043478260869)">
                    <line stroke="#000" x2="-6" y1="0.5" y2="0.5"></line>
                    <text fill="#000" x="-9" y="0.5" dy="0.32em">22</text>
                </g>
            </g>
        );
    }
}

export default AxisX;
