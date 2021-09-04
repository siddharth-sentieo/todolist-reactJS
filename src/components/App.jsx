import React, { Fragment, useCallback, useEffect, useRef } from "react";
import Input from "./Input";
import Item from "./Item";
import ItemsLeft from "./ItemsLeft";
import Search from "./Search";
import PopUp from "./PopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseDonePageNumber,
  increasePinPageNumber,
  increaseTodoPageNumber,
} from "../actions/increasePageNumber";
import {
  endDoneLoading,
  endPinLoading,
  endTodoLoading,
} from "../actions/changeLoading";
import {
  increaseCountByOne,
  initialCount,
  decreaseCountByOne,
} from "../actions/changeCount.js";
import { enablePopUp, disablePopUp } from "../actions/changePopUpStatus.js";
import {
  enableFiltered,
  disableFiltered,
} from "../actions/changeFilteredStatus.js";
import addFilterItems from "../actions/addFilterItems.js";
import { addPinItem, removePinItem } from "../actions/changePinItems.js";
import {
  transferAllToDone,
  addDoneItem,
  removeDoneItem,
} from "../actions/changeDoneItems.js";
import {
  setEmptyTodoList,
  addTodoItem,
  removeTodoItem,
  editTodoItem,
} from "../actions/changeTodoItems.js";
import createNewEditItem from "../actions/changeEditItemInPopUp.js";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const doneItems = useSelector((state) => state.doneItems);

  const pinItems = useSelector((state) => state.pinItems);

  const filterItems = useSelector((state) => state.filterItems);

  const isFiltered = useSelector((state) => state.isFiltered);

  const isPopUp = useSelector((state) => state.isPopUp);

  const count = useSelector((state) => state.count);

  const todoPageNumber = useSelector((state) => state.todoPageNumber);

  const todoLoading = useSelector((state) => state.todoLoading);

  const pinPageNumber = useSelector((state) => state.pinPageNumber);

  const pinLoading = useSelector((state) => state.pinLoading);

  const donePageNumber = useSelector((state) => state.donePageNumber);

  const doneLoading = useSelector((state) => state.doneLoading);

  const editItem = useSelector((state) => state.editItem);

  function lastItemTracker(observer, item, actionFunc) {
    console.log(item);

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      // isIntersecting means ki jis tag mein ref attribute use
      // kiya hai kya wo page pe kahi display ho raha hai
      // is that tag visible on screen
      if (entries[0].isIntersecting) {
        console.log("visible", entries[0]);
        dispatch(actionFunc());
      }
    });

    if (item) {
      observer.current.observe(item);
    }
  }

  const todoObserver = useRef(); // observer will be null by default
  const lastTodoItem = useCallback((item) => {
    lastItemTracker(todoObserver, item, increaseTodoPageNumber);
  }, []);

  const pinObserver = useRef();
  const lastPinItem = useCallback((item) => {
    lastItemTracker(pinObserver, item, increasePinPageNumber);
  }, []);

  const doneObserver = useRef();
  const lastDoneItem = useCallback((item) => {
    lastItemTracker(doneObserver, item, increaseDonePageNumber);
  }, []);

  useEffect(() => {
    console.log("updated");
    sessionStorage.setItem("todo", JSON.stringify(items));
    sessionStorage.setItem("done", JSON.stringify(doneItems));
    sessionStorage.setItem("pin", JSON.stringify(pinItems));
  }, [items, doneItems, pinItems]);

  function addItem(itemObj) {
    dispatch(addTodoItem(itemObj));
  }

  function increaseCount() {
    dispatch(increaseCountByOne());
  }

  function createFilteredList(searchText) {
    const filteredList = items.filter((itemObj) => {
      if (itemObj.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    });

    dispatch(addFilterItems(filteredList));
    dispatch(enableFiltered());
  }

  function resetList() {
    dispatch(disableFiltered());
  }

  function moveToDoneList() {
    dispatch(transferAllToDone(items));

    dispatch(setEmptyTodoList());

    dispatch(initialCount());
  }

  function moveFromOneListToAnother(idx, list) {
    if (list === "todo") {
      dispatch(addDoneItem(items[idx]));

      dispatch(removeTodoItem(idx));

      dispatch(decreaseCountByOne());
    } else {
      dispatch(addTodoItem(doneItems[idx]));

      dispatch(removeDoneItem(idx));

      dispatch(increaseCountByOne());
    }
  }

  function copyToPinList(id) {
    dispatch(addPinItem(items[id]));
  }

  function removeItemFromList(idx, list) {
    if (list === "pin") {
      dispatch(removePinItem(idx));
    } else if (list === "done") {
      dispatch(removeDoneItem(idx));
    } else {
      dispatch(removeTodoItem(idx));
    }
  }

  function hidePopUp() {
    dispatch(disablePopUp());
  }

  function showPopUp() {
    dispatch(enablePopUp());
  }

  function editItemInTodolist(idx, newItemObj) {
    dispatch(editTodoItem(newItemObj, idx));
  }

  function createEditItem(idx, title, description) {
    dispatch(createNewEditItem(title, description, idx));
  }

  const endTodoIndex = todoPageNumber * 3;
  if (endTodoIndex >= items.length) {
    setTimeout(() => {
      dispatch(endTodoLoading());
    }, 1000);
  }

  const endPinIndex = pinPageNumber * 3;
  if (endPinIndex >= pinItems.length) {
    setTimeout(() => {
      dispatch(endPinLoading());
    }, 1000);
  }

  const endDoneIndex = donePageNumber * 3;
  if (endDoneIndex >= doneItems.length) {
    setTimeout(() => {
      dispatch(endDoneLoading());
    }, 1000);
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
            <button
              onClick={moveToDoneList}
              id="mark-done-button"
              type="mark-done"
            >
              Mark all as done
            </button>
          ) : null}

          <div
            id="todo-list"
            className="list"
            style={
              (!isFiltered && items.length > 3) ||
              (isFiltered && filterItems.length > 3)
                ? { height: "490px", overflowY: "auto" }
                : null
            }
          >
            <ol>
              {!isFiltered
                ? items.map((itemObj, index) => {
                    return index < endTodoIndex ? (
                      index === endTodoIndex - 1 ? (
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
                          reference={lastTodoItem}
                        />
                      ) : (
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
                      )
                    ) : null;
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
            {todoLoading && <div className="loading-div">Loading...</div>}
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
                return index < endPinIndex ? (
                  index === endPinIndex - 1 ? (
                    <Item
                      key={index}
                      id={index}
                      in="pin"
                      title={itemObj.title}
                      description={itemObj.description}
                      datetime={itemObj.datetime}
                      toRemove={removeItemFromList}
                      reference={lastPinItem}
                    />
                  ) : (
                    <Item
                      key={index}
                      id={index}
                      in="pin"
                      title={itemObj.title}
                      description={itemObj.description}
                      datetime={itemObj.datetime}
                      toRemove={removeItemFromList}
                    />
                  )
                ) : null;
              })}
              {pinLoading && <div className="loading-div">Loading...</div>}
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
                return index < endDoneIndex ? (
                  index === endDoneIndex - 1 ? (
                    <Item
                      key={index}
                      id={index}
                      in="done"
                      title={itemObj.title}
                      description={itemObj.description}
                      datetime={itemObj.datetime}
                      toSwap={moveFromOneListToAnother}
                      toRemove={removeItemFromList}
                      reference={lastDoneItem}
                    />
                  ) : (
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
                  )
                ) : null;
              })}
              {doneLoading && <div className="loading-div">Loading...</div>}
            </ol>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
