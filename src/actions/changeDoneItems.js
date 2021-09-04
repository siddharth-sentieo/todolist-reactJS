function transferAllToDone(todoItemsArray) {
  return {
    type: "TRANSFER-ALL",
    payload: todoItemsArray,
  };
}

function addDoneItem(itemObj) {
  return {
    type: "ADD-TO-DONE",
    payload: itemObj,
  };
}

function removeDoneItem(index) {
  return {
    type: "REMOVE-FROM-DONE",
    payload: index,
  };
}

export { transferAllToDone, addDoneItem, removeDoneItem };
