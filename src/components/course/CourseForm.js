import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DotChart from '../chart/DotChart.js'
import Uploader from '../common/Uploader.js';

const CourseForm = ({course, selctOptions, onSave, onChange, saving, errors}) => {
    
  onChange = (e) => {
    console.log(e.target.value);
  }

  return (
    <div>
      <Uploader/>
      <SelectInput
          name=""
          label="X-options"
          value={selctOptions.id}
          defaultOption="Select"
          options={selctOptions}
          onChange={onChange}/>
        <DotChart />
    </div>
  );
};

export default CourseForm;
