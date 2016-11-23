import React from 'react';
import * as d3 from 'd3';

function RectGen(w, h, color) {
    d3
        .select(".rect")
        .append("svg")
        .append("rect")
        .attr("width", w)
        .attr("height", h)
        .style("fill", color);
}

function DataChartGen(w, h, padding, dataset) {
    let svg = d3
        .select(".dataChart")
        .append("svg")
        .style("background", "#f1f1f1")
        .attr("width", w)
        .attr("height", h);

    svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * (w / 5);
        })
        .attr("y", function(d){
            return h - (d * 4);
        })
        .attr("width", w / dataset.length - padding)
        .attr("height", function (d) {
            return d * 4;
        })
        .attr("fill", function(d){
            return "rgb(" + d*10 + ", 0, 0)"; }
        )
}


class BasicChart extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     fill: ""
        // };
    }

    componentWillMount() {
        this.setState({fill: "red"});
    }

    componentDidMount() {
        RectGen(30, 100, "blue");

        let dataset = [5, 10, 15, 20, 25];
        DataChartGen(100, 100, 2, dataset);
    }

    render() {
        return (
            <div>
                <h1>LineChart</h1>
                <svg>
                    <rect
                        style={{
                        fill: this.state.fill,
                        width: this.props.width,
                        height: this.props.height
                    }}/>
                </svg>
                <div className="rect"></div>
                <div className="dataChart"></div>
                <div className="lineChart"></div>
            </div>
        );
    }
}

BasicChart.defaultProps = {
    fill: "blue",
    width: "30px",
    height: "200px"
};

BasicChart.propTypes = {};

export default BasicChart;
