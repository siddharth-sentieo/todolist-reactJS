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
import { initialCount } from "../actions/changeCount.js";
import { transferAllToDone } from "../actions/changeDoneItems.js";
import { setEmptyTodoList } from "../actions/changeTodoItems.js";

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

  function moveToDoneList() {
    dispatch(transferAllToDone(items));

    dispatch(setEmptyTodoList());

    dispatch(initialCount());
  }

  function endLoading(listIndex, list, reducerFunc) {
    if (listIndex >= list.length) {
      setTimeout(() => {
        dispatch(reducerFunc());
      }, 1000);
    }
  }

  const endTodoIndex = todoPageNumber * 3;
  endLoading(endTodoIndex, items, endTodoLoading);

  const endPinIndex = pinPageNumber * 3;
  endLoading(endPinIndex, pinItems, endPinLoading);

  const endDoneIndex = donePageNumber * 3;
  endLoading(endDoneIndex, doneItems, endDoneLoading);

  return (
    <Fragment>
      {isPopUp && (
        <PopUp
          title={editItem.editTitle}
          description={editItem.editDescription}
          id={editItem.editId}
        />
      )}
      <h1>Todo List</h1>
      <div id="main-container">
        <div className="sub-container1">
          <h2>Todos</h2>
          <Input />
          <Search />
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
                      <Item
                        key={index}
                        id={index}
                        in="todo"
                        title={itemObj.title}
                        description={itemObj.description}
                        datetime={itemObj.datetime}
                        reference={
                          index === endTodoIndex - 1 ? lastTodoItem : null
                        }
                      />
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
                  <Item
                    key={index}
                    id={index}
                    in="pin"
                    title={itemObj.title}
                    description={itemObj.description}
                    datetime={itemObj.datetime}
                    reference={index === endPinIndex - 1 ? lastPinItem : null}
                  />
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
                  <Item
                    key={index}
                    id={index}
                    in="done"
                    title={itemObj.title}
                    description={itemObj.description}
                    datetime={itemObj.datetime}
                    reference={index === endDoneIndex - 1 ? lastDoneItem : null}
                  />
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
