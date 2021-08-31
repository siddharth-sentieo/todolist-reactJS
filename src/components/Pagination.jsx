import React from "react";

function Pagination(props) {
  const numbers = [];
  for (let i = 1; i <= Math.ceil(props.total / 3); i++) {
    numbers.push(i);
  }

  return (
    <div className="pagination-container">
      {numbers.map((number) => {
        return props.currentPage === number ? (
          <button
            key={number}
            className="active"
            onClick={() => {
              props.toChange(number);
            }}
          >
            {number}
          </button>
        ) : (
          <button
            key={number}
            onClick={() => {
              props.toChange(number);
            }}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
