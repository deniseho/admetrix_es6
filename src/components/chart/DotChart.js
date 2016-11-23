import React from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

function DotChartGen() {
    let monthlySales = data;

    let h = 350;
    let w = 400;
    let padding = 50;

    let lineFun = d3
        .line()
        .x(function (d) {
            return d.month * 30;
        })
        .y(function (d) {
            return h - d.sales;
        });

    let svg = d3
        .select(".dotChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //tooltip
    var tooltip = d3
        .select(".dotChart")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //scale
    let xScaleMin = monthlySales[0]['month'];
    let xScaleMax = monthlySales[monthlySales.length - 1]['month'];

    let xScale = d3
        .scaleLinear()
        .domain([xScaleMin, xScaleMax])
        .range([
            padding + 10,
            w - padding
        ]);

    let yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(monthlySales, function (d) {
                return d.sales;
            })
        ])
        .range([
            h - padding,
            10
        ]);

    let xAxisGen = d3
        .axisBottom(xScale)
        .ticks(monthlySales.length - 1);

    let yAxisGen = d3
        .axisLeft(yScale)
        .ticks(8);

    let yAxis = svg
        .append("g")
        .call(yAxisGen)
        .attr("class", "y-axis")
        .attr("transform", "translate(" + padding + ", 0)");

    let xAxis = svg
        .append("g")
        .call(xAxisGen)
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (h - padding) + ")");

    let dots = svg
        .selectAll("circle")
        .data(monthlySales)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d.month);
        })
        .attr("cy", function (d) {
            return yScale(d.sales);
        })
        .attr("r", 6)
        .attr("fill", function (d) {
            if (d.sales < 200) {
                return '#c1c1c1';
            } else {
                return 'blue';
            }
        })
        .attr("class", "circle-" + monthlySales.month)
        .on("mouseover", function(d){
            tooltip.transition()
                   .duration(100)
                   .style("opacity", .8);

            tooltip.html("銷售額: $" + d.sales)
                   .style("left", (d3.event.pageX - 65) + "px")
                   .style("top", (d3.event.pageY - 65) + "px")
        })
        .on("mouseout", function(d){
            tooltip.transition()
                   .duration(100)
                   .style("opacity", 0);
        });

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

class DotChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        DotChartGen();
    }

    render() {
        return (
            <div className="dotChart"></div>
        );
    }
}

DotChart.defaultProps = {};

DotChart.propTypes = {};

export default DotChart;
