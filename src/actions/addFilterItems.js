function addFilterItems(filterItemsArray) {
  return {
    type: "ADD-FILTER-ITEMS",
    payload: filterItemsArray,
  };
}

export default addFilterItems;
