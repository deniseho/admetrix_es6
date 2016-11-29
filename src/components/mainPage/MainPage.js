import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import {chartFormattedForDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import Uploader from '../common/Uploader.js';
import data from '../../api/data.js';
import * as d3 from 'd3';
import AxisX from '../chart/AxisX.js';
import AxisY from '../chart/AxisY.js';
import Dots from '../chart/Dots.js';
import Tooltip from '../chart/Tooltip.js';

function DotChartGen(xOption, yOption) {
  let testData = data;

  let h = 500;
  let w = 800;
  let padding = 50;

  let svg = d3
    .select(".dotChart")
    .append("svg")
    .attr("id", "svg-" + testData.adName)
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
  let xScaleMax = testData[testData.length - 1][xOption] + 2;

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
        return d[yOption];
      })
    ])
    .range([
      h - padding,
      10
    ]);

  let xAxisGen = d3
    .axisBottom(xScale)
    .ticks(testData.length);

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
    .data(testData)
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
    .attr("class", "circle-" + testData.CTR)
    .on("mouseover", function (d) {
      tooltip
        .transition()
        .duration(100)
        .style("opacity", .8);

      tooltip.html("adName:" + d.adName + "<br/>CPC: " + d[yOption] + "<br/>CTR:" + d[xOption]).style("left", (d3.event.pageX - 65) + "px").style("top", (d3.event.pageY - 65) + "px")
    })
    .on("mouseout", function (d) {
      tooltip
        .transition()
        .duration(100)
        .style("opacity", 0);
    });
}

function DotChartUpdate(xOption, yOption) {
  let testData = data;

  let h = 500;
  let w = 800;
  let padding = 50;

  let svg = d3
    .select(".dotChart")
    .append("svg")
    .attr("id", "svg-" + testData.adName)
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
  let xScaleMax = testData[testData.length - 1][xOption] + 2;

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
        return d[yOption];
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
    .attr("class", "circle-" + testData.adName)
    .on("mouseover", function (d) {
      tooltip
        .transition()
        .duration(100)
        .style("opacity", .8);

      tooltip.html("adName:" + d.adName + "<br/>CPC: " + d[yOption] + "<br/>CTR:" + d[xOption]).style("left", (d3.event.pageX - 65) + "px").style("top", (d3.event.pageY - 65) + "px")
    })
    .on("mouseout", function (d) {
      tooltip
        .transition()
        .duration(100)
        .style("opacity", 0);
    })
    .exit()
    .remove();
}

export class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      xOption: 'CPC',
      yOption: 'CTR'
    };

    this.handleChange = this
      .handleChange
      .bind(this);
  }

  componentDidMount() {
    this
      .setState({
        xOption: this.state.xOption,
        yOption: this.state.yOption
      }, function () {
        DotChartGen(this.state.xOption, this.state.yOption);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    let xOption;

    if (this.state.xOption != prevState.xOption) {
      DotChartUpdate(this.state.xOption, 'CTR')
    }
  }

  handleChange(e) {
    this.setState({xOption: e.target.value});
  }

  render() {
    return (
      <div>
        <SelectInput
          name=""
          label="y-options"
          value={this.props.selectOptions.id}
          options={this.props.selectOptions}
          onChange={this.handleChange}/>

        <svg width={800} height={500}>
        	<text textAnchor="middle" transform={`translate(400, 494)`}>xOption</text>
        	<text textAnchor="middle" transform={`translate(14, 250)rotate(-90)`}>yOption</text>

          <AxisX/>
          <AxisY/>
          <Dots/>
        </svg>
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
