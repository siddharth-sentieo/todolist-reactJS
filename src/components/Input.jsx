import React, { Fragment } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  changeItemInfoTitle,
  changeItemInfoDescription,
  changeItemInfoBoth,
} from "../actions/changeItemInfo";

function Input(props) {
  const item = useSelector((state) => state.itemInfo);
  const dispatch = useDispatch();

  function handleChange(event) {
    const { tagName, value: newValue } = event.target;

    if (tagName === "INPUT") {
      dispatch(changeItemInfoTitle(newValue));
    } else if (tagName === "TEXTAREA") {
      dispatch(changeItemInfoDescription(newValue));
    }
  }

  function handleClick() {
    props.toAdd({
      ...item,
      datetime: "Created: " + new Date().toLocaleString(),
    });
    props.toIncrease();

    dispatch(changeItemInfoBoth());
  }

  return (
    <Fragment>
      <input
        onChange={handleChange}
        id="title-input"
        type="text"
        placeholder="Add title"
        value={item.title}
        category="title"
      ></input>
      <textarea
        onChange={handleChange}
        id="description-input"
        rows="3"
        placeholder="Add description"
        value={item.description}
      ></textarea>
      <button onClick={debounce(handleClick, 2000)} id="add-button" type="add">
        Add
      </button>
    </Fragment>
  );
}

export default Input;
