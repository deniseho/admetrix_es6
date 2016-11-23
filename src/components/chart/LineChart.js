import React from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

function LineChartGen() {
    let monthlySales = data;

    let h = 350;
    let w = 400;

    let lineFun = d3
        .line()
        .x(function (d) {
            return d.month * 30;
        })
        .y(function (d) {
            return h - d.sales;
        });

    let svg = d3
        .select(".lineChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    let viz = svg
        .append("path")
        .attr("d", lineFun(monthlySales))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    let labels = svg
        .selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(function (d) {
            return d.sales;
        })
        .attr("x", function (d) {
            return (d.month * 30) - 25;
        })
        .attr("y", function (d) {
            return h - d.sales;
        })
        .attr("font-size", "12px")
        .attr("fill", "#66666")
        .attr("text-anchor", "start")
        .attr("dy", "-1em");
}

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({fill: "red"});
    }

    componentDidMount() {
        LineChartGen();
    }

    render() {
        return (
            <div className="lineChart"></div>
        );
    }
}

LineChart.defaultProps = {};

LineChart.propTypes = {};

export default LineChart;
