const todoPageNumberReducer = (state = 1, action) => {
  if (action.type === "TODO-INCREMENT") {
    return state + 1;
  }
  return state;
};

const donePageNumberReducer = (state = 1, action) => {
  if (action.type === "DONE-INCREMENT") {
    return state + 1;
  }
  return state;
};

const pinPageNumberReducer = (state = 1, action) => {
  if (action.type === "PIN-INCREMENT") {
    return state + 1;
  }
  return state;
};

export { todoPageNumberReducer, donePageNumberReducer, pinPageNumberReducer };
