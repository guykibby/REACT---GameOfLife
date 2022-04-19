import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

let rows = 30;
let cols = 50;
// let speed = 100;

let gridFull = Array(rows)
  .fill()
  .map(() => Array(cols).fill(false));

const Box = ({ boxClass, boxId, row, col }) => {
  return <div className={boxClass}></div>;
};

const Grid = () => {
  const width = cols * 16;
  let rowsArr = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let boxId = i + " " + j;
      let boxClass = gridFull[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box boxClass={boxClass} boxId={boxId} key={boxId} row={i} col={j} />
      );
    }
  }

  return (
    <div className="grid" style={{ width: width }}>
      {rowsArr}
    </div>
  );
};

const Main = () => {
  const [genNum, setGen] = useState(0);

  return (
    <>
      <h1>The Game of Life</h1>
      <Grid />
      <h2>Generations: {genNum}</h2>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
