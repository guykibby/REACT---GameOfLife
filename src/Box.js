import React from "react";

const Box = ({ boxClass, boxId, row, col, callback }) => {
  const ifClicked = () => {
    callback(row, col);
  };

  return <div className={boxClass} id={boxId} onClick={ifClicked}></div>;
};

export default Box;
