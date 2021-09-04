function changeFilter(newFilterText) {
  return {
    type: "CHANGE",
    payload: newFilterText,
  };
}

export default changeFilter;
