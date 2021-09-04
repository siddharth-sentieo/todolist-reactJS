const isFilteredReducer = (state = false, action) => {
  if (action.type === "NO") {
    return false;
  } else if (action.type === "YES") {
    return true;
  }
  return state;
};

export default isFilteredReducer;
