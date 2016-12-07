import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import * as dataFilterActions from '../../actions/dataFilterActions';
import * as selectFilterActions from '../../actions/selectFilterActions';
import * as axisFilterActions from '../../actions/axisFilterActions.js';
import {AxisDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import Uploader from '../common/Uploader.js';
import Data from '../../api/data.js';
import * as d3 from 'd3';
import Filters from '../mainPage/Filters.js';

export class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      xOption: 'CPC',
      yOption: 'CTR'
    };

    this.handleXChange = this
      .handleXChange
      .bind(this);

    this.handleYChange = this
      .handleYChange
      .bind(this);
  }

  componentDidMount() {
    this
      .setState({
        xOption: this.state.xOption,
        yOption: this.state.yOption
      }, function () {});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entireData != nextProps.entireData) {
      this.DotChartGen(nextProps.entireData, this.state.xOption, this.state.yOption);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.xOption != prevState.xOption || this.state.yOption != prevState.yOption) {
      this.DotChartUpdate();
    }
  }

  handleXChange(e) {
    this.setState({xOption: e.target.value});
  }

  handleYChange(e) {
    this.setState({yOption: e.target.value});
  }

  DotChartGen(data, xOption, yOption) {
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
      .attr("transform", `translate(${padding}, 0)`);

    //xAxis label
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h - 5)
      .attr("txtAnchor", "middle")
      .text(this.state.xOption)

    //yAxis label
    svg
      .append("text")
      .attr("txtAnchor", "middle")
      .attr("transform", `translate(15, ${h / 2})rotate(-90)`)
      .text(this.state.yOption)

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

        tooltip.html("adName:" + d.adName + "<br/>" + xOption + ": " + d[xOption] + "<br/>" + yOption + ": " + d[yOption]).style("left", (d3.event.pageX - 65) + "px").style("top", (d3.event.pageY - 65) + "px")
      })
      .on("mouseout", function (d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", 0);
      })
  }

  DotChartUpdate() {
    let svg = d3
      .select("#dotChart")
      .remove()

    this.DotChartGen(this.props.entireData, this.state.xOption, this.state.yOption);
  }

  render() {
    return (
      <div className="container-fluid">
        <Filters entireData={this.props.entireData}/>
        <div className="row">
          <div className="col-md-offset-2 col-md-2">
            <SelectInput
              name="xOption"
              label="x軸"
              value={this.state.xOption}
              options={this.props.axisOptions}
              onChange={this.handleXChange}/>
            <SelectInput
              name="yOption"
              label="y軸"
              value={this.state.yOption}
              options={this.props.axisOptions}
              onChange={this.handleYChange}/>
          </div>
          <div className="dotChart"></div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  entireData: PropTypes.array,
  axisOptions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// MainPage.contextTypes = {
//   router: PropTypes.object
// };

function mapStateToProps(state, ownProps) {
  // console.log("mainpage state: " + JSON.stringify(state));
  return {
    entireData: state.entireData, 
    axisOptions: AxisDropdown(state.axisFilters)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, axisFilterActions, 
    dataFilterActions, selectFilterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
