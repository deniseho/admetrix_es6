import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import * as dataFilterActions from '../../actions/dataFilterActions';
import * as selectFilterActions from '../../actions/selectFilterActions';
import * as axisFilterActions from '../../actions/axisFilterActions.js';
import {AxisDropdown} from '../../selectors/selectors';
import SelectInput from '../common/SelectInput';
import {ProjectFilterDropdown, AdSetFilterDropdown, AdFilterDropdown, CategoryFilterDropdown} from '../../selectors/selectors';
import Uploader from '../common/Uploader.js';
import Data from '../../api/data.js';
import * as d3 from 'd3';
import Filters from '../mainPage/Filters.js';

export class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      xOption: 'CPC',
      yOption: 'CTR',

      project: "",
      adSet: "",
      ad: "",
      category: ""
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

    this.handleAdSetChange = this
      .handleAdSetChange
      .bind(this);

    this.handleAdChange = this
      .handleAdChange
      .bind(this);

    this.handleCategoryChange = this
      .handleCategoryChange
      .bind(this);
  }

  componentDidMount() {
    this
      .setState({
        xOption: this.state.xOption,
        yOption: this.state.yOption,

        project: this.state.project,
        adSet: this.state.adSet,
        ad: this.state.adName,
        category: this.state.category
      }, function () {});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entireData != nextProps.entireData) {
      this.DotChartGen(nextProps.entireData, this.state.xOption, this.state.yOption);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.xOption != prevState.xOption || this.state.yOption != prevState.yOption) {
      this.DotChartUpdate(this.state.project);
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
    let xScale = d3
      .scaleLinear()
      .domain([0, 
        d3.max(data, function (d) {
          return d[xOption];
        })
      ])
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

  DotChartUpdate(proj) {
    let svg = d3
      .select("#dotChart")
      .remove()
      console.log(this.props.entireData);
    let data = this.props.entireData.filter(x=>x.projId == proj);
      console.log(data);
    this.DotChartGen(data, this.state.xOption, this.state.yOption);
  }

  handleProjectChange(e) {
    this.setState({project: e.target.value});
    this.DotChartUpdate(e.target.value) ;
  }

  handleAdSetChange(e) {
    this.setState({adSet: e.target.value});
  }

  handleAdChange(e) {
    this.setState({ad: e.target.value});
  }

  handleCategoryChange(e) {
    this.setState({category: e.target.value});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row filters">
          <div className="col-md-offset-2 col-md-2">
            <SelectInput
              name=""
              label="行銷專案"
              value={this.state.project}
              options={this.props.projectOptions}
              onChange={this.handleProjectChange}/>
          </div>
          <div className="col-md-2">
            <SelectInput
              name=""
              label="廣告組合"
              value={this.state.adSet}
              options={this.props.adSetOptions}
              onChange={this.handleAdSetChange}/>
          </div>
          <div className="col-md-2">
            <SelectInput
              name=""
              label="廣告名稱"
              value={this.state.ad}
              options={this.props.adOptions}
              onChange={this.handleAdChange}/>
          </div>
          <div className="col-md-2">
            <SelectInput
              name=""
              label="成果類型"
              value={this.state.category}
              options={this.props.categoryOptions}
              onChange={this.handleCategoryChange}/>
          </div>
        </div>
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
  actions: PropTypes.object.isRequired,

  projectOptions: PropTypes.array,
  adSetOptions: PropTypes.array,
  adOptions: PropTypes.array,
  categoryOptions: PropTypes.array
};

// MainPage.contextTypes = {   router: PropTypes.object };

function mapStateToProps(state, ownProps) {
  let projectOptions = state.dataFilters.projects;
  let adSetOptions = state.dataFilters.adSets;
  let adOptions = state.dataFilters.ads;
  let categoryOptions = state.dataFilters.categories;

  return {
    entireData: state.entireData,
    axisOptions: AxisDropdown(state.axisFilters),

    project: state.selectedOptions.project,
    adSet: state.selectedOptions.adSet,
    ad: state.selectedOptions.ad,
    category: state.selectedOptions.category,

    projectOptions: ProjectFilterDropdown(projectOptions),
    adSetOptions: AdSetFilterDropdown(adSetOptions),
    adOptions: AdFilterDropdown(adOptions),
    categoryOptions: CategoryFilterDropdown(categoryOptions)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, axisFilterActions, dataFilterActions, selectFilterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
