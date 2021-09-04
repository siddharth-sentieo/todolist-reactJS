const pinData = sessionStorage.getItem("pin");

const pinItemsReducer = (
  state = pinData ? JSON.parse(pinData) : [],
  action
) => {
  switch (action.type) {
    case "ADD-TO-PIN":
      return [action.payload, ...state];

    case "REMOVE-FROM-PIN":
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];

    default:
      return state;
  }
};

export default pinItemsReducer;
