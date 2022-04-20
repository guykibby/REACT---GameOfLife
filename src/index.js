import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Grid from "./Grid.js";

let rows = 30;
let cols = 50;
let speed = 100;
let genNum = 0;
let grid = Array(rows)
  .fill()
  .map(() => Array(cols).fill(false));

const arrayClone = (array) => {
  return JSON.parse(JSON.stringify(array));
};

const Main = () => {
  // const [genNum, setGen] = useState(0);
  // const [theState, setState] = useState("STOP");
  const [intervalId, setIntervalId] = useState(0);
  const [gridFull, setGrid] = useState(grid);

  const switchBoxState = (row, col) => {
    let gridCopy = [...gridFull];
    gridCopy[row][col] = !gridCopy[row][col];
    setGrid(gridCopy);
  };

  useEffect(() => seedGrid(), []);

  const seedGrid = () => {
    let gridCopy = [...gridFull];

    gridCopy = gridCopy.map((rowArray) =>
      rowArray.map((cell) => {
        if (Math.floor(Math.random() * 4) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
    // setGen(0);
    genNum = 0;
    setGrid(gridCopy);
  };

  const nextGen = () => {
    let gridCopy = [...gridFull];
    // let gridCopy = arrayClone(gridFull);
    // let gridCopy = gridFull.map((arr) => arr.slice());
    // console.log(gridCopy[-1][-1]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbours = 0;
        if (i > 0 && j > 0) {
          if (gridFull[i - 1][j - 1]) {
            neighbours++;
          }
        }
        if (i > 0) {
          if (gridFull[i - 1][j]) {
            neighbours++;
          }
        }
        if (i > 0 && j < cols - 1) {
          if (gridFull[i - 1][j + 1]) {
            neighbours++;
          }
        }
        if (j < cols - 1) {
          if (gridFull[i][j + 1]) {
            neighbours++;
          }
        }
        if (i < rows - 1 && j < cols - 1) {
          if (gridFull[i + 1][j + 1]) {
            neighbours++;
          }
        }
        if (i < rows - 1) {
          if (gridFull[i + 1][j]) {
            neighbours++;
          }
        }
        if (i < rows - 1 && j > 0) {
          if (gridFull[i + 1][j - 1]) {
            neighbours++;
          }
        }
        if (j > 0) {
          if (gridFull[i][j - 1]) {
            neighbours++;
          }
        }

        if (gridCopy[i][j] === true) {
          if (neighbours < 2 || neighbours > 3) {
            gridCopy[i][j] = false;
          }
        } else if (neighbours === 3) {
          gridCopy[i][j] = true;
        }
      }
    }

    setGrid(gridCopy);
    genNum += 1;
  };

  const start = () => {
    const newIntervalId = setInterval(nextGen, speed);
    setIntervalId(newIntervalId);
  };

  const stop = () => {
    clearInterval(intervalId);
    setIntervalId(0);
  };

  return (
    <>
      <h1>The Game of Life</h1>
      <div>
        <button onClick={start}>START</button>
        <button onClick={stop}>STOP</button>
        <button onClick={seedGrid}>SEED</button>
        <button onClick={nextGen}>nextGen</button>
      </div>
      <Grid theGrid={gridFull} callback={switchBoxState} />
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
