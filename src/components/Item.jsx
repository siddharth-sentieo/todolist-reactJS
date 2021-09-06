import { addPinItem, removePinItem } from "../actions/changePinItems.js";
import { removeDoneItem } from "../actions/changeDoneItems.js";
import { enablePopUp } from "../actions/changePopUpStatus.js";
import createNewEditItem from "../actions/changeEditItemInPopUp.js";
import { addTodoItem, removeTodoItem } from "../actions/changeTodoItems.js";
import {
  increaseCountByOne,
  decreaseCountByOne,
} from "../actions/changeCount.js";
import { addDoneItem } from "../actions/changeDoneItems.js";

import React, { Fragment } from "react";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";

function Item(props) {
  const isChecked = false;
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const doneItems = useSelector((state) => state.doneItems);

  function handleChange() {
    console.log("clicked");

    const idx = props.id;
    if (props.in === "todo") {
      dispatch(addDoneItem(items[idx]));

      dispatch(removeTodoItem(idx));

      dispatch(decreaseCountByOne());
    } else {
      dispatch(addTodoItem(doneItems[idx]));

      dispatch(removeDoneItem(idx));

      dispatch(increaseCountByOne());
    }
  }

  function handlePinClick() {
    dispatch(addPinItem(items[props.id]));
  }

  function handleCancelClick() {
    if (props.in === "pin") {
      dispatch(removePinItem(props.id));
    } else if (props.in === "done") {
      dispatch(removeDoneItem(props.id));
    } else {
      dispatch(removeTodoItem(props.id));
    }
  }

  function handleEditClick() {
    dispatch(enablePopUp());

    dispatch(createNewEditItem(props.title, props.description, props.id));
  }

  return (
    <Fragment>
      <li ref={props.reference}>
        <div>
          {props.in === "pin" ? null : (
            <input
              onChange={handleChange}
              type="checkbox"
              checked={props.in === "todo" ? isChecked : !isChecked}
            />
          )}
          <label
            style={
              props.in === "done" ? { textDecoration: "line-through" } : null
            }
          >
            {props.title}
          </label>
          {props.in === "todo" ? null : (
            <CancelPresentationRoundedIcon
              onClick={handleCancelClick}
              style={{ float: "right" }}
            />
          )}
          {props.in === "todo" && (
            <div className="pin-n-edit-container">
              <PinDropOutlinedIcon onClick={handlePinClick} />
              <EditOutlinedIcon onClick={handleEditClick} />
            </div>
          )}
          <p className="description">{ReactHtmlParser(props.description)}</p>
          <p className="date-time">{props.datetime}</p>
        </div>
      </li>
    </Fragment>
  );
}

export default Item;
