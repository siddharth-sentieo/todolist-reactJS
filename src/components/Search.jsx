import React, { Component, Fragment, useState } from "react";
import Button from "./Button";
import InputBox from "./InputBox";

// function Search(props) {
//     const [filterText, setFilterText] = useState("");

//     function handleChange(event) {
//         setFilterText(event.target.value);
//     }

//     return (
// <Fragment>
//     <input onChange={handleChange} id="search-input" type="text" placeholder="Search" value={filterText}></input>
//     <button onClick={() => {
//         props.toCreate(filterText);
//         setFilterText("");
//     }} id="filter-button">Filter</button>
//     <button onClick={props.toReset} id="reset-button">Reset</button>
// </Fragment>
//     );
// }

class Search extends Component {
  constructor() {
    super();
    this.state = {
      filterText: "",
    };

    // here we are binding the handleChange function to the this keyword of the class
    // without binding we cannot use the this keyword inside the handlechange()
    // after creating a bound function of the handlechange function
    // we store that bound function inside the handlechange() only
    // now we can use the this keyword inside the handlechange()
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ filterText: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <InputBox
          onChange={this.handleChange}
          id="search-input"
          type="text"
          placeholder="Search"
          value={this.state.filterText}
          category="search"
        ></InputBox>
        <Button
          onClick={() => {
            this.props.toCreate(this.state.filterText);
            this.setState({ filterText: "" });
          }}
          id="filter-button"
          type="filter"
        >
          Filter
        </Button>
        <Button onClick={this.props.toReset} id="reset-button" type="reset">
          Reset
        </Button>
      </Fragment>
    );
  }
}

export default Search;
