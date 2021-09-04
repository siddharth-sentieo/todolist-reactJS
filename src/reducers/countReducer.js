const todoData = sessionStorage.getItem("todo");
const val = todoData ? JSON.parse(todoData).length : 0;
const countReducer = (state = val, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;

    case "DECREASE":
      return state - 1;

    case "INITIAL":
      return 0;

    default:
      return state;
  }
};

export default countReducer;
