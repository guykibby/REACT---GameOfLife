import React from "react";
import Box from "./Box";

const Grid = ({ callback, theGrid }) => {
  let rowsArr = [];

  for (let i = 0; i < theGrid.length; i++) {
    for (let j = 0; j < theGrid[i].length; j++) {
      let boxId = i + " " + j;
      let boxClass = theGrid[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          boxId={boxId}
          key={boxId}
          row={i}
          col={j}
          callback={callback}
        />
      );
    }
  }

  return <div className="grid">{rowsArr}</div>;
};

export default Grid;
