import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import * as dataFilterActions from '../../actions/dataFilterActions';
import * as axisFilterActions from '../../actions/axisFilterActions.js';
import SelectInput from '../common/SelectInput';
import {AxisDropdown, ProjectFilterDropdown, AdFilterDropdown, ActionTypeFilterDropdown, MonthFilterDropdown} from '../../selectors/selectors';
import Uploader from '../common/Uploader.js';
import * as d3 from 'd3';
require('d3-extended')(d3);
import Login from '../login/Login.js'

export class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    let initData = {
      xOption: 'CPC_all',
      yOption: 'CTR_all',

      project: "6055151364614",
      ad: "6055151371814",

      month: "201605",
      actionType: "post_engagement",

      entireData: []
    };

    this.state = {
      xOption: initData.xOption,
      yOption: initData.yOption,

      project: initData.project,
      ad: initData.ad,

      month: initData.month,
      actionType: initData.actionType,

      entireData: initData.entireData
    };

    this.handleXChange = this
      .handleXChange
      .bind(this);

    this.handleYChange = this
      .handleYChange
      .bind(this);

    this.handleMonthChange = this
      .handleMonthChange
      .bind(this);

    this.handleActionTypeChange = this
      .handleActionTypeChange
      .bind(this);

    this.handleProjectChange = this
      .handleProjectChange
      .bind(this);

    this.handleAdChange = this
      .handleAdChange
      .bind(this);
  }

  componentWillMount() {
    this.setState({
      xOption: this.state.xOption,
      yOption: this.state.yOption,

      project: this.state.project,
      ad: this.state.ad,

      month: this.state.month,
      actionType: this.state.actionType,

      entireData: this.state.entireData
    })
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
      .text(this.AxisMapping(this.state.xOption))

    //yAxis label
    svg
      .append("text")
      .attr("class", "yAxisLabel")
      .attr("txtAnchor", "middle")
      .attr("transform", `translate(15, ${h / 2})rotate(-90)`)
      .text(this.AxisMapping(this.state.yOption))

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
        if (x >= padding && x <= w - padding) {
          hoverLine
            .attr("x1", x)
            .attr("x2", x)
            .style("opacity", 1);
        }
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

        tooltip
          .transition()
          .duration(100)
          .style("opacity", .8);

        tooltip.html(d.adName + "<br/>" + xOption + ": " + d[xOption] + "<br/>" + yOption + ": " + d[yOption]).style("left", (d3.event.pageX - 350) + "px").style("top", (d3.event.pageY - 160) + "px")
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

  //=======================todo: Mappings==============================
  AxisMapping(option) {
    if (option === 'CPC_link') 
      return 'CPC(連結)';
    else if (option === 'CPC_all') 
      return 'CPC(全部)';
    else if (option === 'CTR_link') 
      return 'CTR(連結)';
    else if (option === 'CTR_all') 
      return 'CTR(全部)';
    }
  
  MonthMapping(option) {
    if (option === '201605') 
      return '2016-05';
    else if (option === '201606') 
      return '2016-06';
    else if (option === '201607') 
      return '2016-07';
    else if (option === '201608') 
      return '2016-08';
    else if (option === '201609') 
      return '2016-09';
    else if (option === '201610') 
      return '2016-10';
    else if (option === '201611') 
      return '2016-11';
    }
  
  ActionTypeMapping(option) {
    if (option === 'post_engagement') 
      return 'Post Engagement';
    else if (option === 'link_click') 
      return 'Link Click';
    else if (option === 'video_view') 
      return 'Video View';
    else if (option === 'offsite_conversion') 
      return 'Offsite Conversion';
    }
  
  ProjectMapping(option) {
    if (option === '6055151364614') 
      return '1107_愛麗絲專案';
    else if (option === '6055142199014') 
      return '1107_旗山馬＿最後報名';
    }
  
  AdMapping(option) {
    if (option === '6055151371814') 
      return '貼文：「」 - 貼文互動';
    else if (option === '6055142199014') 
      return '1107_旗山馬＿最後報名貼文＿嘉義以北';
    else if (option === '6055142198414') 
      return '1107_旗山馬＿最後報名貼文＿台南以南';
    else if (option === '6055142939014') 
      return '1107_旗山馬＿最後報名貼文＿未繳費名單';
    }
  
  //=======================todo: Mappings==============================

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

  handleMonthChange(e) {
    this.setState({month: e.target.value});
  }

  handleProjectChange(e) {
    this.setState({project: e.target.value});
  }

  handleActionTypeChange(e) {
    this.setState({actionType: e.target.value});
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
      <div>
        <div className="topArea"></div>
        <div className="row">
          <div className="col-md-3">
            <div className="well">
              <div className="row">
                <div className="col-md-6">
                  <SelectInput
                    name=""
                    label="起"
                    value={this.state.month}
                    options={this.props.monthOptions}
                    onChange={this.handleMonthChange}/>
                </div>
                 <div className="col-md-6">
                  <SelectInput
                    name=""
                    label="迄"
                    value={this.state.month}
                    options={this.props.monthOptions}
                    onChange={this.handleMonthChange}/>
                </div>
              </div>
              <SelectInput
                name=""
                label="成果類型"
                value={this.state.actionType}
                options={this.props.actionTypeOptions}
                onChange={this.handleActionTypeChange}/>
              <br/>
              <SelectInput
                name=""
                label="行銷專案"
                value={this.state.project}
                options={this.props.projectOptions}
                onChange={this.handleProjectChange}/>
              <SelectInput
                name=""
                label="廣告名稱"
                value={this.state.ad}
                options={this.props.adOptions}
                onChange={this.handleAdChange}/>
              <br/>
              <div className="row">
                <div className="col-md-6">
                  <SelectInput
                    name="xOption"
                    label="x軸"
                    value={this.state.xOption}
                    options={this.props.xAxisOptions}
                    onChange={this.handleXChange}/>
                  <SelectInput
                    name="yOption"
                    label="y軸"
                    value={this.state.yOption}
                    options={this.props.yAxisOptions}
                    onChange={this.handleYChange}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h5>
              {this.MonthMapping(this.state.month)}</h5>
            <h5>
              {this.ActionTypeMapping(this.state.actionType)}</h5>
            <h5>
              {this.ProjectMapping(this.state.project)}</h5>
            <h5>
              {this.AdMapping(this.state.ad)}
            </h5>
            <div className="dotChart"></div>
          </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  entireData: PropTypes.array,
  xAxisOptions: PropTypes.array.isRequired,
  yAxisOptions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,

  projectOptions: PropTypes.array,
  adOptions: PropTypes.array
};

// MainPage.contextTypes = { router: PropTypes.object };

function mapStateToProps(state, ownProps) {
  console.log(state.dataFilters)
  return {
    entireData: state.entireData,

    project: state.dataFilters.projects[0],
    ad: state.dataFilters.ads[0],

    xAxisOptions: AxisDropdown(state.axisFilters.filter(x => x.axis == "x")),
    yAxisOptions: AxisDropdown(state.axisFilters.filter(x => x.axis == "y")),

    projectOptions: ProjectFilterDropdown(state.dataFilters.projects),
    monthOptions: MonthFilterDropdown(state.dataFilters.monthes),

    adOptions: AdFilterDropdown(state.dataFilters.ads),
    actionTypeOptions: ActionTypeFilterDropdown(state.dataFilters.actionTypes)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, axisFilterActions, dataFilterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
