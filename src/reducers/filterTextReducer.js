const filterTextReducer = (state = "", action) => {
  if (action.type === "CHANGE") {
    return action.payload;
  }
  return state;
};

export default filterTextReducer;
