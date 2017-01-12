export function AxisDropdown(options) {
  return options.map(data => {
    return {
      value: data.axisValue,
      text: data.axisText
    };
  });
}

export function ProjectFilterDropdown(options) {
  return options.map(data => {
    return {
      value: data.projId,
      text: data.projName
    };
  });
}


export function AdFilterDropdown(options) {
  return options.map(data => {
    return {
      value: data.adId,
      text: data.adName
    };
  });
}
