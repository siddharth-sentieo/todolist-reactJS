function endTodoLoading() {
  return {
    type: "TODO-ENDED",
  };
}

function endPinLoading() {
  return {
    type: "PIN-ENDED",
  };
}

function endDoneLoading() {
  return {
    type: "DONE-ENDED",
  };
}

export { endTodoLoading, endDoneLoading, endPinLoading };
