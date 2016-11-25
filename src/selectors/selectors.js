export function chartFormattedForDropdown(allData) {
  return allData.map(data => {
    return {
      value: data.id,
      text: data.text
    };
  });
}
