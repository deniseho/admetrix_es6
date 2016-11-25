import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {chartFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';
import SelectInput from '../common/SelectInput';
import DotChart from '../chart/DotChart.js'
import Uploader from '../common/Uploader.js';


export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  onChange(e){
    console.log(e.target.value);  
  }
  
  render() {
    return (
    <div>
       <Uploader/>
       <SelectInput
          name=""
          label="X-options"
          value={this.props.selectOptions.id}
          defaultOption="Select"
          options={this.props.selectOptions}
          onChange={this.onChange}/>
        <DotChart xOption={'CTR'} yOption={'CPC'} />
    </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  selectOptions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  let selectOptions = [
    {
          id: 'CPC',
          text: 'CPC'
      }, {
          id: 'CTR',
          text: 'CTR'
    }];

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    selectOptions: chartFormattedForDropdown(selectOptions)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
