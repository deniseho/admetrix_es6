import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import {chartFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';
import SelectInput from '../common/SelectInput';
import Uploader from '../common/Uploader.js';
import data from '../../api/data.js';
import * as d3 from 'd3';

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

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      xOption: 'CPC',
      yOption: 'CTR',
      errors: {}
    };

    this.handleChange = this
      .handleChange
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
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
        <Uploader/>
        <SelectInput
          name=""
          label="y-options"
          value={this.props.selectOptions.id}
          options={this.props.selectOptions}
          onChange={this.handleChange}/>
        <div className="dotChart"></div>
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  selectOptions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on
// this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) 
    return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  let selectOptions = [
    {
      id: 'CPC',
      text: 'CPC'
    }, {
      id: 'CTR',
      text: 'CTR'
    }
  ];

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {course: course, selectOptions: chartFormattedForDropdown(selectOptions)};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
