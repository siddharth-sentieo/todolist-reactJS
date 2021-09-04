function createNewEditItem(title, description, id) {
  return {
    type: "CREATE",
    payload: {
      title: title,
      description: description,
      index: id,
    },
  };
}

export default createNewEditItem;
