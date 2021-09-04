function increaseCountByOne() {
  return {
    type: "INCREASE",
  };
}

function decreaseCountByOne() {
  return {
    type: "DECREASE",
  };
}

function initialCount() {
  return {
    type: "INITIAL",
  };
}

export { increaseCountByOne, decreaseCountByOne, initialCount };
