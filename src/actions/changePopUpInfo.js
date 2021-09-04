function changePopUpInfoTitle(newTitle) {
  return {
    type: "NORMAL",
    payload: newTitle,
  };
}

function changePopUpInfoDescription(newDescription) {
  return {
    type: "CKEDITOR",
    payload: newDescription,
  };
}

export { changePopUpInfoTitle, changePopUpInfoDescription };
