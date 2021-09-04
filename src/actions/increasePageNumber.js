function increaseTodoPageNumber() {
  return {
    type: "TODO-INCREMENT",
  };
}

function increaseDonePageNumber() {
  return {
    type: "DONE-INCREMENT",
  };
}

function increasePinPageNumber() {
  return {
    type: "PIN-INCREMENT",
  };
}

export {
  increaseTodoPageNumber,
  increaseDonePageNumber,
  increasePinPageNumber,
};
