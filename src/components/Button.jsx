import styled from "styled-components";

const Button = styled.button`
  font-size: 19px;
  padding: 5px;
  background-color: green;
  margin: 10px 10px 10px 0px;
  border-radius: 5px;
  display: ${(props) => {
    return props.type === "add" || props.type === "mark-done" ? "block" : null;
  }};
  margin-top: ${(props) => {
    return props.type === "mark-done" ? "20px" : null;
  }};
  margin-left: ${(props) => {
    return props.type === "filter" ? "10px" : null;
  }};
`;

export default Button;
