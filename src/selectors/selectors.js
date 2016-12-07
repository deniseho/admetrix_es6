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

export function AdSetFilterDropdown(options) {
  return options.map(data => {
    return {
      value: data.adSetId,
      text: data.adSetName
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

export function CategoryFilterDropdown(options) {
  return options.map(data => {
    return {
      value: data.categoryId,
      text: data.categoryName
    };
  });
}