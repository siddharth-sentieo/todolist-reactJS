import React, { Fragment, useEffect, useState } from "react";
import Input from "./Input";
import Item from "./Item";
import ItemsLeft from "./ItemsLeft";
import Search from "./Search";
import PopUp from "./PopUp";
import Button from "./Button";

function App() {
  const todoData = sessionStorage.getItem("todo");
  const doneData = sessionStorage.getItem("done");
  const pinData = sessionStorage.getItem("pin");
  const [items, setItems] = useState(todoData ? JSON.parse(todoData) : []);
  const [doneItems, setDoneItems] = useState(
    doneData ? JSON.parse(doneData) : []
  );
  const [pinItems, setPinItems] = useState(pinData ? JSON.parse(pinData) : []);
  const [filterItems, setFilterItems] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [count, setCount] = useState(items.length);

  const [editItem, setEditItem] = useState({
    editTitle: "",
    editDescription: "",
    editId: -1,
  });

  useEffect(() => {
    console.log("updated");
    sessionStorage.setItem("todo", JSON.stringify(items));
    sessionStorage.setItem("done", JSON.stringify(doneItems));
    sessionStorage.setItem("pin", JSON.stringify(pinItems));
  }, [items, doneItems, pinItems]);

  function addItem(itemObj) {
    setItems([itemObj, ...items]);
  }

  function increaseCount() {
    setCount(count + 1);
  }

  function createFilteredList(searchText) {
    const filteredList = items.filter((itemObj) => {
      if (itemObj.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    });

    setFilterItems(filteredList);
    setIsFiltered(true);
  }

  function resetList() {
    setIsFiltered(false);
  }

  function moveToDoneList() {
    setDoneItems(items);
    setItems([]);
    setCount(0);
  }

  function moveFromOneListToAnother(idx, list) {
    if (list === "todo") {
      setDoneItems([...doneItems, items[idx]]);
      setItems([...items.slice(0, idx), ...items.slice(idx + 1)]);
      setCount(count - 1);
    } else {
      setItems([...items, doneItems[idx]]);
      setDoneItems([...doneItems.slice(0, idx), ...doneItems.slice(idx + 1)]);
      setCount(count + 1);
    }
  }

  function copyToPinList(id) {
    setPinItems((prevPinItems) => {
      return [...prevPinItems, items[id]];
    });
  }

  function removeItemFromList(idx, list) {
    if (list === "pin") {
      setPinItems((prevPinItems) => {
        return [...prevPinItems.slice(0, idx), ...prevPinItems.slice(idx + 1)];
      });
    } else if (list === "done") {
      setDoneItems((prevDoneItems) => {
        return [
          ...prevDoneItems.slice(0, idx),
          ...prevDoneItems.slice(idx + 1),
        ];
      });
    } else {
      setItems((prevItems) => {
        return [...prevItems.slice(0, idx), ...prevItems.slice(idx + 1)];
      });
    }
  }

  function hidePopUp() {
    setIsPopUp(false);
  }

  function showPopUp() {
    setIsPopUp(true);
  }

  function editItemInTodolist(idx, newItemObj) {
    setItems((prevItemsArray) => {
      prevItemsArray[idx].title = newItemObj.title;
      prevItemsArray[idx].description = newItemObj.description;
      prevItemsArray[idx].datetime =
        "Last Updated: " + new Date().toLocaleString();
      return [...prevItemsArray];
    });
  }

  function createEditItem(idx, title, description) {
    setEditItem({
      editTitle: title,
      editDescription: description,
      editId: idx,
    });
  }

  return (
    <Fragment>
      {isPopUp && (
        <PopUp
          title={editItem.editTitle}
          description={editItem.editDescription}
          id={editItem.editId}
          toHide={hidePopUp}
          toEdit={editItemInTodolist}
        />
      )}
      <h1>Todo List</h1>
      <div id="main-container">
        <div className="sub-container1">
          <h2>Todos</h2>
          <Input toAdd={addItem} toIncrease={increaseCount} />
          <Search toCreate={createFilteredList} toReset={resetList} />
          {!isFiltered ? (
            <Button
              onClick={moveToDoneList}
              id="mark-done-button"
              type="mark-done"
            >
              Mark all as done
            </Button>
          ) : null}

          <div
            id="todo-list"
            className="list"
            style={
              (!isFiltered && items.length > 3) ||
              (isFiltered && filterItems.length > 3)
                ? { height: "480px", overflowY: "auto" }
                : null
            }
          >
            <ol>
              {!isFiltered
                ? items.map((itemObj, index) => {
                    return (
                      <Item
                        key={index}
                        id={index}
                        in="todo"
                        title={itemObj.title}
                        description={itemObj.description}
                        datetime={itemObj.datetime}
                        toSwap={moveFromOneListToAnother}
                        toCopy={copyToPinList}
                        toShow={showPopUp}
                        toCreate={createEditItem}
                      />
                    );
                  })
                : filterItems.map((itemObj, index) => {
                    return (
                      <Item
                        key={index}
                        id={index}
                        in="todo"
                        title={itemObj.title}
                        description={itemObj.description}
                        datetime={itemObj.datetime}
                        toSwap={moveFromOneListToAnother}
                        toCopy={copyToPinList}
                        toShow={showPopUp}
                        toCreate={createEditItem}
                      />
                    );
                  })}
            </ol>
          </div>

          {!isFiltered ? <ItemsLeft count={count} /> : null}
        </div>

        <div className="sub-container2">
          <h2>Pinned Items</h2>
          <div
            id="pinned-list"
            className="list"
            style={
              pinItems.length > 3
                ? { height: "330px", overflowY: "auto" }
                : null
            }
          >
            <ol>
              {pinItems.map((itemObj, index) => {
                return (
                  <Item
                    key={index}
                    id={index}
                    in="pin"
                    title={itemObj.title}
                    description={itemObj.description}
                    datetime={itemObj.datetime}
                    toRemove={removeItemFromList}
                  />
                );
              })}
            </ol>
          </div>

          <h2>Already Done</h2>
          <div
            id="mark-done-list"
            className="list"
            style={
              doneItems.length > 3
                ? { height: "330px", overflowY: "auto" }
                : null
            }
          >
            <ol>
              {doneItems.map((itemObj, index) => {
                return (
                  <Item
                    key={index}
                    id={index}
                    in="done"
                    title={itemObj.title}
                    description={itemObj.description}
                    datetime={itemObj.datetime}
                    toSwap={moveFromOneListToAnother}
                    toRemove={removeItemFromList}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
