const editItemReducer = (
  state = {
    editTitle: "",
    editDescription: "",
    editId: -1,
  },
  action
) => {
  if (action.type === "CREATE") {
    return {
      editTitle: action.payload.title,
      editDescription: action.payload.description,
      editId: action.payload.index,
    };
  }
  return state;
};

export default editItemReducer;
