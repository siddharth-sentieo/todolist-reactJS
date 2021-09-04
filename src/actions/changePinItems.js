function addPinItem(itemObj) {
  return {
    type: "ADD-TO-PIN",
    payload: itemObj,
  };
}

function removePinItem(index) {
  return {
    type: "REMOVE-FROM-PIN",
    payload: index,
  };
}

export { addPinItem, removePinItem };
