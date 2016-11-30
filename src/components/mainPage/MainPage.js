import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import {chartFormattedForDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import Uploader from '../common/Uploader.js';
import Data from '../../api/data.js';
import * as d3 from 'd3';
import AxisX from '../chart/AxisX.js';
import AxisY from '../chart/AxisY.js';
import Dots from '../chart/Dots.js';
import Tooltip from '../chart/Tooltip.js';


export class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      xOption: 'CPC',
      yOption: 'CTR'
    };

    this.handleXChange = this.handleXChange.bind(this);
    this.handleYChange = this.handleYChange.bind(this);
  }

  componentDidMount() {

    let h = 500;
    let w = 800;
    let padding = 50;

    this
      .setState({
        xOption: this.state.xOption,
        yOption: this.state.yOption
      }, function () {
        this.DotChartGen(this.state.xOption, this.state.yOption);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.xOption != prevState.xOption || this.state.yOption != prevState.yOption) {
      this.DotChartUpdate(this.state.xOption, this.state.yOption);
    }
  }

  handleXChange(e) {
    this.setState({xOption: e.target.value});
  }

  handleYChange(e) {
    this.setState({yOption: e.target.value});
  }

  DotChartGen(xOption, yOption) {
    let data = Data;

    let h = 500;
    let w = 800;
    let padding = 50;

    let svg = d3
      .select(".dotChart")
      .append("svg")
      .attr("id", "dotChart")
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
    let xScaleMax = data[data.length - 1][xOption] + 2;

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
        d3.max(data, function (d) {
          return d[yOption];
        })
      ])
      .range([
        h - padding,
        10
      ]);

    let xAxisGen = d3
      .axisBottom(xScale)
      .ticks(data.length);

    let xAxis = svg
      .append("g")
      .call(xAxisGen)
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (h - padding) + ")");

    let yAxisGen = d3
      .axisLeft(yScale)
      .ticks(8);

    let yAxis = svg
      .append("g")
      .call(yAxisGen)
      .attr("class", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)");

    let dots = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d[xOption]);
      })
      .attr("cy", function (d) {
        return yScale(d[yOption]);
      })
      .attr("r", 6)
      .attr("fill", function (d) {
        if (!d.isUser) {
          return '#c1c1c1';
        } else {
          return 'blue';
        }
      })
      .on("mouseover", function (d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", .8);

        tooltip.html("adName:" + d.adName + "<br/>" 
                    + xOption + ": " + d[xOption] + "<br/>" 
                    + yOption + ": " + d[yOption])
                    .style("left", (d3.event.pageX - 65) + "px")
                    .style("top", (d3.event.pageY - 65) + "px")
      })
      .on("mouseout", function (d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", 0);
      })
  }

  DotChartUpdate(){
    let svg = d3
      .select(".dotChart")
      .select("#dotChart")
      .remove()

    this.DotChartGen(this.state.xOption, this.state.yOption);
  }

  render() {
    return (
      <div>
        <SelectInput
          name=""
          label="x-options"
          value={this.state.xOption}
          options={this.props.selectOptions}
          onChange={this.handleXChange}/>

        <SelectInput
          name=""
          label="y-options"
          value={this.state.yOption}
          options={this.props.selectOptions}
          onChange={this.handleYChange}/>

        <div className="dotChart"></div>
      </div>
    );
  }
}

MainPage.propTypes = {
  selectOptions: PropTypes.array.isRequired
  // actions: PropTypes.object.isRequired
};

MainPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {

  let selectOptions = [
    {
      id: 'CPC',
      text: 'CPC'
    }, {
      id: 'CTR',
      text: 'CTR'
    }
  ];

  return {selectOptions: chartFormattedForDropdown(selectOptions)}
}

// function mapDispatchToProps(dispatch) {   return {     actions:
// bindActionCreators(dataActions, dispatch)   }; } export default
// connect(mapStateToProps, mapDispatchToProps)(MainPage);
export default connect(mapStateToProps)(MainPage);




// function DotChartGen(xOption, yOption) {
//   let data = data;

//   let h = 500;
//   let w = 800;
//   let padding = 50;

//   let svg = d3
//     .select(".dotChart")
//     .append("svg")
//     .attr("id", "svg-" + data.adName)
//     .attr("width", w)
//     .attr("height", h);

//   //tooltip
//   var tooltip = d3
//     .select(".dotChart")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

//   //scale
//   let xScaleMin = 0;
//   let xScaleMax = data[data.length - 1][xOption] + 2;

//   let xScale = d3
//     .scaleLinear()
//     .domain([xScaleMin, xScaleMax])
//     .range([
//       padding + 10,
//       w - padding
//     ]);

//   let yScale = d3
//     .scaleLinear()
//     .domain([
//       0,
//       d3.max(data, function (d) {
//         return d[yOption];
//       })
//     ])
//     .range([
//       h - padding,
//       10
//     ]);

//   let xAxisGen = d3
//     .axisBottom(xScale)
//     .ticks(data.length);

//   let xAxis = svg
//     .append("g")
//     .call(xAxisGen)
//     .attr("class", "x-axis")
//     .attr("transform", "translate(0," + (h - padding) + ")");

//   let yAxisGen = d3
//     .axisLeft(yScale)
//     .ticks(8);

//   let yAxis = svg
//     .append("g")
//     .call(yAxisGen)
//     .attr("class", "y-axis")
//     .attr("transform", "translate(" + padding + ", 0)");

//   let dots = svg
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) {
//       return xScale(d[xOption]);
//     })
//     .attr("cy", function (d) {
//       return yScale(d[yOption]);
//     })
//     .attr("r", 6)
//     .attr("fill", function (d) {
//       if (!d.isUser) {
//         return '#c1c1c1';
//       } else {
//         return 'blue';
//       }
//     })
//     .attr("class", "circle-" + data.CTR)
//     .on("mouseover", function (d) {
//       tooltip
//         .transition()
//         .duration(100)
//         .style("opacity", .8);

//       tooltip.html("adName:" + d.adName + "<br/>CPC: " + d[yOption] + "<br/>CTR:" + d[xOption]).style("left", (d3.event.pageX - 65) + "px").style("top", (d3.event.pageY - 65) + "px")
//     })
//     .on("mouseout", function (d) {
//       tooltip
//         .transition()
//         .duration(100)
//         .style("opacity", 0);
//     });
// }