const todoLoadingReducer = (state = true, action) => {
  if (action.type === "TODO-ENDED") {
    return false;
  }
  return state;
};

const pinLoadingReducer = (state = true, action) => {
  if (action.type === "PIN-ENDED") {
    return false;
  }
  return state;
};

const doneLoadingReducer = (state = true, action) => {
  if (action.type === "DONE-ENDED") {
    return false;
  }
  return state;
};

export { todoLoadingReducer, pinLoadingReducer, doneLoadingReducer };
