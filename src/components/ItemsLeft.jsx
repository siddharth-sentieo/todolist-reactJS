import React, { Component, Fragment } from "react";
import styled from "styled-components";

// function ItemsLeft(props) {
//     return (
//         <Fragment>
//             <p id="items-left-info">
//                 <b>{props.count} </b>
//                 items left
//             </p>
//         </Fragment>
//     );
// }

const ItemsLeftPara = styled.p`
  background-color: lime;
  padding: 5px 5px 5px 15px;
  font-size: 20px;
`;

class ItemsLeft extends Component {
  render() {
    return (
      <Fragment>
        <ItemsLeftPara>
          <b>{this.props.count} </b>
          items left
        </ItemsLeftPara>
      </Fragment>
    );
  }
}

export default ItemsLeft;
