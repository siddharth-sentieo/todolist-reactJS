const isPopUpReducer = (state = false, action) => {
  if (action.type === "SHOW") {
    return true;
  } else if (action.type === "HIDE") {
    return false;
  }
  return state;
};

export default isPopUpReducer;
