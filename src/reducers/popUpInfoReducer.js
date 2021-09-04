const popUpInfoReducer = (state = { title: "", description: "" }, action) => {
  if (action.type === "NORMAL") {
    return {
      ...state,
      title: action.payload,
    };
  } else if (action.type === "CKEDITOR") {
    return {
      ...state,
      description: action.payload,
    };
  }

  return state;
};

export default popUpInfoReducer;
