import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import changeFilter from "../actions/changeFilter";

function Search(props) {
  const filterText = useSelector((state) => state.filterText);
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch(changeFilter(event.target.value));
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
      <button
        onClick={() => {
          props.toCreate(filterText);

          dispatch(changeFilter(""));
        }}
        id="filter-button"
        type="filter"
      >
        Filter
      </button>
      <button onClick={props.toReset} id="reset-button" type="reset">
        Reset
      </button>
    </Fragment>
  );
}

export default Search;
