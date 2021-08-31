import styled from "styled-components";

const InputBox = styled.input`
  font-size: 19px;
  padding: 5px;
  width: ${(props) => {
    return props.category === "title" ? "80%" : "50%";
  }};
  margin-top: ${(props) => {
    return props.category === "search" ? "20px" : null;
  }};
  margin-bottom: ${(props) => {
    return props.category === "title" ? "10px" : null;
  }};
`;

export default InputBox;
