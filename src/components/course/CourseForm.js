import React from 'react';
import TextInput from '../common/TextInput';
import DotChart from '../chart/DotChart.js'
import Uploader from '../common/Uploader.js';

const CourseForm = ({course, selectOptions, onSave, onChange, saving, errors}) => {
    
  onChange = (e) => {
    console.log(e.target.value);
  }

function test(e){
  console.log("e: " + e);
}
  return (
    <div>
      <Uploader/>
        <DotChart />
    </div>
  );
};

export default CourseForm;
