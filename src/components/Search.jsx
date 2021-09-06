import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import changeFilter from "../actions/changeFilter";
import {
  enableFiltered,
  disableFiltered,
} from "../actions/changeFilteredStatus.js";
import addFilterItems from "../actions/addFilterItems.js";

function Search(props) {
  const filterText = useSelector((state) => state.filterText);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch(changeFilter(event.target.value));
  }

  function handleClick() {
    const filteredList = items.filter((itemObj) => {
      if (itemObj.title.toLowerCase().includes(filterText.toLowerCase())) {
        return true;
      }
      return false;
    });

    dispatch(addFilterItems(filteredList));
    dispatch(enableFiltered());

    dispatch(changeFilter(""));
  }

  return (
    <Fragment>
      <input
        onChange={handleChange}
        id="search-input"
        type="text"
        placeholder="Search"
        value={filterText}
        category="search"
      ></input>
      <button onClick={handleClick} id="filter-button" type="filter">
        Filter
      </button>
      <button
        onClick={() => dispatch(disableFiltered())}
        id="reset-button"
        type="reset"
      >
        Reset
      </button>
    </Fragment>
  );
}

export default Search;
