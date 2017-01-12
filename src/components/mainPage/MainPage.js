import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import * as userDataActions from '../../actions/userDataActions';
import * as dataFilterActions from '../../actions/dataFilterActions';
import * as selectFilterActions from '../../actions/selectFilterActions';
import * as axisFilterActions from '../../actions/axisFilterActions.js';
import {AxisDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import {ProjectFilterDropdown, AdFilterDropdown} from '../../selectors/selectors';
import Uploader from '../common/Uploader.js';
import * as d3 from 'd3';
require('d3-extended')(d3);

export class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      xOption: 'CPC_all',
      yOption: 'CTR_all',

      project: "6055151364614",
      ad: "6055151371814",

      entireData: []
    };

    this.handleXChange = this
      .handleXChange
      .bind(this);

    this.handleYChange = this
      .handleYChange
      .bind(this);

    this.handleProjectChange = this
      .handleProjectChange
      .bind(this);

    this.handleAdChange = this
      .handleAdChange
      .bind(this);
  }

  componentDidMount() {
    this
      .setState({
        xOption: this.state.xOption,
        yOption: this.state.yOption,

        project: this.state.project,
        ad: this.state.ad,

        entireData: this.state.entireData
      }, function () {});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entireData !== nextProps.entireData) {
      this
        .setState({
          "entireData": nextProps.entireData
        }, function () {
          this.DotChartGen(this.state.entireData, this.state.xOption, this.state.yOption, this.state.ad);
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.xOption != prevState.xOption || this.state.yOption != prevState.yOption) {
      this.DotChartUpdate();
    }
  }

  DotChartGen(data, xOption, yOption, selectedAd) {
    let h = 600;
    let w = 1100;
    let padding = 70;

    let svg = d3
      .select(".dotChart")
      .append("svg")
      .attr("id", "dotChart")
      .attr("width", w)
      .attr("height", h);

    //tooltip
    let tooltip = d3
      .select(".dotChart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    let xOptionMax = d3.max(data, function (d) {
      return d[xOption]
    });
    let xOptionMin = d3.min(data, function (d) {
      return d[xOption]
    });
    let yOptionMax = d3.max(data, function (d) {
      return d[yOption]
    });
    let yOptionMin = d3.min(data, function (d) {
      return d[yOption]
    });

    let xOptionUnit = (xOptionMax - xOptionMin) / data.length;
    let yOptionUnit = (yOptionMax - yOptionMin) / data.length;

    //scale
    let xScale = d3
      .scaleLinear()
      .domain([
        xOptionMin - xOptionUnit,
        xOptionMax + xOptionUnit
      ])
      .range([
        padding, w - padding
      ]);

    let yScale = d3
      .scaleLinear()
      .domain([
        yOptionMin - yOptionUnit,
        yOptionMax + yOptionUnit
      ])
      .range([
        h - padding,
        0
      ]);

    let xAxisGen = d3
      .axisBottom(xScale)
      .tickPadding(10)
      .ticks(data.length);

    let xAxis = svg
      .append("g")
      .call(xAxisGen)
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (h - padding) + ")");

    let yAxisGen = d3
      .axisLeft(yScale)
      .tickPadding(10)
      .ticks(data.length);

    let yAxis = svg
      .append("g")
      .call(yAxisGen)
      .attr("class", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)");

    let xAxisSubGen = d3
      .axisBottom(xScale)
      .tickFormat("")
      .tickSize(-h + padding, 0)
      .ticks(data.length * 2);

    svg
      .append("g")
      .attr("class", "xSubgrid")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxisSubGen)

    let yAxisSubGen = d3
      .axisLeft(yScale)
      .tickFormat("")
      .tickSize(-w + (padding * 2), 0)
      .ticks(data.length);

    svg
      .append("g")
      .attr("class", "ySubgrid")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxisSubGen)

    //xAxis label
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h - 10)
      .attr("class", "xAxisLabel")
      .attr("txtAnchor", "middle")
      .text(this.state.xOption)

    //yAxis label
    svg
      .append("text")
      .attr("class", "yAxisLabel")
      .attr("txtAnchor", "middle")
      .attr("transform", `translate(15, ${h / 2})rotate(-90)`)
      .text(this.state.yOption)


    var hoverLineGroup = svg
      .append("g")
      .attr("class", "hover-line");

    var hoverLine = hoverLineGroup
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", h - padding);
    hoverLine.style("opacity", 1e-6);

    d3
      .select('#dotChart')
      .on("mousemove", function () {
        var x = d3.mouse(this)[0];
        hoverLine
          .attr("x1", x)
          .attr("x2", x)
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        hoverLine.style("opacity", 1e-6);
      });



    let dots = svg
      .append("g")
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
      .attr("r", 5)
      .attr("fill", function (d) {
        if (d.adId === selectedAd) {

          d3
            .select(this)
            .moveToFront();

          return '#005AB5';
        } else {
          return '#E0E0E0';
        }
      })
      .on("mouseover", function (d) {

        svg
          .selectAll("circle")
          .sort(function (a, b) {
            if (a.id != d.id) 
              return -1;
            else 
              return 1;
            }
          );

        d3
          .select(this)
          .attr("stroke", function (d) {
            if (d.adId === selectedAd) {
              return '#ACD6FF';
            } else {
              return '#c1c1c1';
            }
          })
          .attr("r", 6)
          .attr("stroke-width", 3)
          .attr("cursor", "pointer");

        tooltip
          .transition()
          .duration(100)
          .style("opacity", .8);

        tooltip.html(d.adName + "<br/>" + xOption + ": " + d[xOption] + "<br/>" + yOption + ": " + d[yOption]).style("left", (d3.event.pageX + 20) + "px").style("top", (d3.event.pageY) + "px")
      })
      .on("mouseout", function (d) {

        d3
          .select(this)
          .attr("stroke-width", 0)
          .attr("r", 5);

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

    this.DotChartGen(this.state.entireData, this.state.xOption, this.state.yOption, this.state.ad);
  }

  handleXChange(e) {
    this.setState({xOption: e.target.value});
  }

  handleYChange(e) {
    this.setState({yOption: e.target.value});
  }

  handleProjectChange(e) {
    this.setState({project: e.target.value});
  }

  handleAdChange(e) {
    this
      .setState({
        ad: e.target.value
      }, function () {
        this.DotChartUpdate()
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row filters">
          <div className="col-md-offset-4 col-md-2">
            <SelectInput
              name=""
              label="行銷專案"
              value={this.state.project}
              options={this.props.projectOptions}
              onChange={this.handleProjectChange}/>
          </div>
          <div className="col-md-4">
            <SelectInput
              name=""
              label="廣告名稱"
              value={this.state.ad}
              options={this.props.adOptions}
              onChange={this.handleAdChange}></SelectInput>
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-1 col-md-2">
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
  actions: PropTypes.object.isRequired,

  projectOptions: PropTypes.array,
  adOptions: PropTypes.array
};

// MainPage.contextTypes = { router: PropTypes.object };

function mapStateToProps(state, ownProps) {
  let projectOptions = state.dataFilters.projects;
  let adOptions = state.dataFilters.ads;
  console.log(state.axisFilters)
  return {
    entireData: state.entireData,
    axisOptions: AxisDropdown(state.axisFilters),

    project: state.selectedOptions.project,
    ad: state.selectedOptions.ad,

    projectOptions: ProjectFilterDropdown(projectOptions),
    adOptions: AdFilterDropdown(adOptions)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, axisFilterActions, dataFilterActions, selectFilterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
