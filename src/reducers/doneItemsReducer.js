const doneData = sessionStorage.getItem("done");

const doneItemsReducer = (
  state = doneData ? JSON.parse(doneData) : [],
  action
) => {
  switch (action.type) {
    case "TRANSFER-ALL":
      return [...action.payload, ...state];
    case "ADD-TO-DONE":
      return [action.payload, ...state];
    case "REMOVE-FROM-DONE":
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    default:
      return state;
  }
};

export default doneItemsReducer;
