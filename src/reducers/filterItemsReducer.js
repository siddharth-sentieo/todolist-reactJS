const filterItemsReducer = (state = [], action) => {
  if (action.type === "ADD-FILTER-ITEMS") {
    return action.payload;
  }
  return state;
};

export default filterItemsReducer;
