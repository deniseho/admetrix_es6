import React from 'react';
import data from '../../api/data.js';
import * as d3 from 'd3';

function DotChartGen(xOption, yOption) {
    let testData = data;

    let h = 500;
    let w = 600;
    let padding = 50;

    function getXOption(d) {
        switch (xOption) {
            case 'CPC':
                return d.CPC;
            case 'CTR':
                return d.CTR;
        }
    }

    function getYOption(d) {
        switch (yOption) {
            case 'CPC':
                return d.CPC;
            case 'CTR':
                return d.CPC;
        }
    }

    let lineFun = d3
        .line()
        .x(function (d) {
            return getXOption(d) * 30;
        })
        .y(function (d) {
            return h - getYOption(d);
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
    let xScaleMin = 0;
    let xScaleMax = testData[testData.length - 1]['CTR'] + 2;

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
            d3.max(testData, function (d) {
                return getYOption(d);
            })
        ])
        .range([
            h - padding,
            10
        ]);

    let xAxisGen = d3
        .axisBottom(xScale)
        .ticks(testData.length);

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
        .data(testData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(getXOption(d));
        })
        .attr("cy", function (d) {
            return yScale(getYOption(d));
        })
        .attr("r", 6)
        .attr("fill", function (d) {
            if (!d.isUser) {
                return '#c1c1c1';
            } else {
                return 'blue';
            }
        })
        .attr("class", "circle-" + testData.CTR)
        .on("mouseover", function (d) {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", .8);

            tooltip.html("adName:" + d.adName + "<br/>CPC: " + getYOption(d) + "<br/>CTR:" + getXOption(d)).style("left", (d3.event.pageX - 65) + "px").style("top", (d3.event.pageY - 65) + "px")
        })
        .on("mouseout", function (d) {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 0);
        });

    let labels = svg
        .selectAll("text")
        .data(testData)
        .enter()
        .append("text")
        .text(function (d) {
            return getYOption(d);
        })
        .attr("x", function (d) {
            return (getXOption(d) * 30) - 25;
        })
        .attr("y", function (d) {
            return h - getYOption(d);
        })
        .attr("font-size", "12px")
        .attr("fill", "#66666")
        .attr("text-anchor", "start")
        .attr("dy", "-1em");
}

class DotChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xOption: String,
            yOption: String
        }
    }

    componentDidMount() {
        this
            .setState({
                xOption: 'CTR',
                yOption: 'CPC'
            }, function () {
                DotChartGen(this.state.xOption, this.state.yOption)
            });
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="dotChart"></div>
        );
    }
}

export default DotChart;
