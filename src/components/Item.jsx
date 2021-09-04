import React, { Fragment } from "react";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ReactHtmlParser from "react-html-parser";

function Item(props) {
  const isChecked = false;

  function handleChange() {
    console.log("clicked");
    props.toSwap(props.id, props.in);
  }

  function handlePinClick() {
    props.toCopy(props.id);
  }

  function handleCancelClick() {
    props.toRemove(props.id, props.in);
  }

  function handleEditClick() {
    props.toShow();
    props.toCreate(props.id, props.title, props.description);
  }

  return (
    <Fragment>
      <li ref={props.reference !== undefined ? props.reference : null}>
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
