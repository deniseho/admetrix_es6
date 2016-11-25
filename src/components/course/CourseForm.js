import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DotChart from '../chart/DotChart.js'

const CourseForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <SelectInput
        name="authorId"
        label="X"
        value={course.authorId}
        defaultOption="Select"
        options={allAuthors}
        onChange={onChange} error={errors.authorId}/>
        <DotChart/>
    </form>
  );
};

CourseForm.propTypes = {

};

export default CourseForm;
