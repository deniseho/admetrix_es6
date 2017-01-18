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

export function ActionTypeFilterDropdown(options) {
  return options.map(data => {
    return {
      value: data.actionTypeValue,
      text: data.actionTypeText
    };
  });
}

export function MonthFilterDropdown(options) {
  return options.map(data => {
    return {
      value: data.monthId,
      text: data.monthText
    };
  });
}