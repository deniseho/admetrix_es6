import React, {PropTypes} from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

function AxisXGen(data, h, padding, svg, xScale) {
    let xAxisGen = d3
        .axisBottom(xScale)
        .ticks(data.length);

    let xAxis = svg
        .append("g")
        .call(xAxisGen)
        .attr("className", "x-axis")
        .attr("transform", "translate(0," + (h - padding) + ")");
}

export class AxisX extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {}

    handleChange() {}

    render() {
        return (
            <g
                fill="none"
                fontSize="10"
                fontFamily="sans-serif"
                textAnchor="middle"
                className="x-axis"
                transform="translate(0,450)">
                <path className="domain" stroke="#000" d="M60.5,6V0.5H750.5V6"></path>
                <g className="tick" opacity="1" transform="translate(60,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">0</text>
                </g>
                <g className="tick" opacity="1" transform="translate(120,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">2</text>
                </g>
                <g className="tick" opacity="1" transform="translate(180,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">4</text>
                </g>
                <g className="tick" opacity="1" transform="translate(240,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">6</text>
                </g>
                <g className="tick" opacity="1" transform="translate(300,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">8</text>
                </g>
                <g className="tick" opacity="1" transform="translate(360,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">10</text>
                </g>
                <g className="tick" opacity="1" transform="translate(420,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">12</text>
                </g>
                <g className="tick" opacity="1" transform="translate(480,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">14</text>
                </g>
                <g className="tick" opacity="1" transform="translate(540,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">16</text>
                </g>
                <g className="tick" opacity="1" transform="translate(600,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">18</text>
                </g>
                <g className="tick" opacity="1" transform="translate(660,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">20</text>
                </g>
                <g className="tick" opacity="1" transform="translate(720,0)">
                    <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
                    <text fill="#000" y="9" x="0.5" dy="0.71em">22</text>
                </g>
            </g>
        );
    }
}

export default AxisX;
