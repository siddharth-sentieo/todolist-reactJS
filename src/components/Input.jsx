import React, { Component, Fragment, useState } from "react";
import { debounce } from "lodash";
import Button from "./Button";
import InputBox from "./InputBox";

// function Input(props) {
//   const [item, setItem] = useState({
//     title: "",
//     description: "",
//   });

//   function handleChange(event) {
//     const { tagName, value: newValue } = event.target;

//     if (tagName === "INPUT") {
//       setItem({
//         title: newValue,
//         description: item.description,
//       });
//     } else if (tagName === "TEXTAREA") {
//       setItem({
//         title: item.title,
//         description: newValue,
//       });
//     }
//   }

// function handleClick() {
//   props.toAdd({
//     ...item,
//     datetime: "Created: " + new Date().toLocaleString(),
//   });
//   props.toIncrease();

//   setItem({
//     title: "",
//     description: "",
//   });
// }

//   return (
// <Fragment>
//   <input
//     onChange={handleChange}
//     id="title-input"
//     type="text"
//     placeholder="Add title"
//     value={item.title}
//   ></input>
//   <textarea
//     onChange={handleChange}
//     id="description-input"
//     rows="3"
//     placeholder="Add description"
//     value={item.description}
//   ></textarea>
//   <button onClick={debounce(handleClick, 2000)} id="add-button">
//     Add
//   </button>
// </Fragment>
//   );
// }

class Input extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { tagName, value: newValue } = event.target;

    if (tagName === "INPUT") {
      this.setState({
        title: newValue,
        description: this.state.description,
      });
    } else if (tagName === "TEXTAREA") {
      this.setState({
        title: this.state.title,
        description: newValue,
      });
    }
  }

  handleClick() {
    this.props.toAdd({
      ...this.state,
      datetime: "Created: " + new Date().toLocaleString(),
    });

    this.props.toIncrease();

    this.setState({
      title: "",
      description: "",
    });
  }

  render() {
    return (
      <Fragment>
        <InputBox
          onChange={this.handleChange}
          id="title-input"
          type="text"
          placeholder="Add title"
          value={this.state.title}
          category="title"
        ></InputBox>
        <textarea
          onChange={this.handleChange}
          id="description-input"
          rows="3"
          placeholder="Add description"
          value={this.state.description}
        ></textarea>
        <Button
          onClick={debounce(this.handleClick, 2000)}
          id="add-button"
          type="add"
        >
          Add
        </Button>
      </Fragment>
    );
  }
}

export default Input;
