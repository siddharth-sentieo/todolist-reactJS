const itemInfoReducer = (state = { title: "", description: "" }, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        title: action.payload,
      };

    case "TEXTAREA":
      return {
        ...state,
        description: action.payload,
      };

    case "BOTH":
      return {
        title: "",
        description: "",
      };

    default:
      return state;
  }
};

export default itemInfoReducer;
