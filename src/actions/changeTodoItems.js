function setEmptyTodoList() {
  return {
    type: "EMPTY-TODO",
  };
}

function addTodoItem(itemObj) {
  return {
    type: "ADD-TO-TODO",
    payload: itemObj,
  };
}

function removeTodoItem(index) {
  return {
    type: "REMOVE-FROM-TODO",
    payload: index,
  };
}

function editTodoItem(itemObj, index) {
  return {
    type: "EDIT-A-TODOITEM",
    payload: {
      editedItemObj: itemObj,
      index: index,
    },
  };
}

export { setEmptyTodoList, addTodoItem, removeTodoItem, editTodoItem };
