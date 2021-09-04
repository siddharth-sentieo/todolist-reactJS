function changeItemInfoTitle(newTitle) {
  return {
    type: "INPUT",
    payload: newTitle,
  };
}

function changeItemInfoDescription(newDescription) {
  return {
    type: "TEXTAREA",
    payload: newDescription,
  };
}

function changeItemInfoBoth() {
  return {
    type: "BOTH",
  };
}

export { changeItemInfoTitle, changeItemInfoDescription, changeItemInfoBoth };
