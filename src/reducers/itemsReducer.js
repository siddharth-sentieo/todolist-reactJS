const todoData = sessionStorage.getItem("todo");

const itemsReducer = (state = todoData ? JSON.parse(todoData) : [], action) => {
  switch (action.type) {
    case "EMPTY-TODO":
      return [];

    case "ADD-TO-TODO":
      return [action.payload, ...state];

    case "REMOVE-FROM-TODO":
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];

    case "EDIT-A-TODOITEM":
      const newItemsArray = [...state];
      newItemsArray[action.payload.index].title =
        action.payload.editedItemObj.title;
      newItemsArray[action.payload.index].description =
        action.payload.editedItemObj.description;
      newItemsArray[action.payload.index].datetime =
        "Last Updated: " + new Date().toLocaleString();

      return newItemsArray;

    default:
      return state;
  }
};

export default itemsReducer;
