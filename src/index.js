import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Grid from "./Grid.js";

let rows = 30;
let cols = 50;
let genNum = 0;
let speed = 100;
let grid = Array(rows)
  .fill()
  .map(() => Array(cols).fill(false));

const arrayClone = (array) => {
  return JSON.parse(JSON.stringify(array));
};

const switchBoxState = (row, col) => {
  let gridCopy = arrayClone(grid);
  gridCopy[row][col] = !gridCopy[row][col];
  grid = gridCopy;
};

const seedGrid = () => {
  let gridCopy = arrayClone(grid);

  gridCopy = gridCopy.map((rowArray) =>
    rowArray.map((cell) => {
      if (Math.floor(Math.random() * 4) === 1) {
        return true;
      } else {
        return false;
      }
    })
  );

  genNum = 0;
  grid = gridCopy;
};

seedGrid();

const clearGrid = () => {
  grid = Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));
};

const nextGen = () => {
  let gridCopy = arrayClone(grid);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighbours = 0;
      if (i > 0 && j > 0) {
        if (grid[i - 1][j - 1]) {
          neighbours++;
        }
      }
      if (i > 0) {
        if (grid[i - 1][j]) {
          neighbours++;
        }
      }
      if (i > 0 && j < cols - 1) {
        if (grid[i - 1][j + 1]) {
          neighbours++;
        }
      }
      if (j < cols - 1) {
        if (grid[i][j + 1]) {
          neighbours++;
        }
      }
      if (i < rows - 1 && j < cols - 1) {
        if (grid[i + 1][j + 1]) {
          neighbours++;
        }
      }
      if (i < rows - 1) {
        if (grid[i + 1][j]) {
          neighbours++;
        }
      }
      if (i < rows - 1 && j > 0) {
        if (grid[i + 1][j - 1]) {
          neighbours++;
        }
      }
      if (j > 0) {
        if (grid[i][j - 1]) {
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

  grid = gridCopy;
  genNum += 1;
};

const Main = () => {
  const [intervalId, setIntervalId] = useState(0);
  const [gridFull, setGrid] = useState(grid);

  const start = () => {
    const newIntervalId = setInterval(() => {
      nextGen();
      setGrid(grid);
    }, speed);
    setIntervalId(newIntervalId);
  };

  const pause = () => {
    clearInterval(intervalId);
    setIntervalId(0);
  };

  const switchBox = (row, col) => {
    switchBoxState(row, col);
    setGrid(grid);
  };

  const seed = () => {
    seedGrid();
    setGrid(grid);
  };

  const clear = () => {
    clearGrid();
    setGrid(grid);
  };

  const spawn = () => {
    nextGen();
    setGrid(grid);
  };

  const slow = () => {
    if (speed < 2000) {
      speed = speed * 2;
    }

    if (intervalId !== 0) {
      pause();
      start();
    }
    console.log(speed);
  };

  const fast = () => {
    if (speed > 3) {
      speed = speed / 2;
    }

    if (intervalId !== 0) {
      pause();
      start();
    }
    console.log(speed);
  };

  return (
    <>
      <h1>The Game of Life</h1>
      <div className="buttonBar">
        <button onClick={start} disabled={intervalId !== 0}>
          START
        </button>
        <button onClick={pause} disabled={intervalId === 0}>
          PAUSE
        </button>
        <button onClick={clear} disabled={intervalId !== 0}>
          CLEAR
        </button>
        <button onClick={seed} disabled={intervalId !== 0}>
          SEED
        </button>
        <button onClick={spawn} disabled={intervalId !== 0}>
          SPAWN
        </button>
        <button onClick={slow} disabled={intervalId === 0}>
          SLOWER
        </button>
        <button onClick={fast} disabled={intervalId === 0}>
          FASTER
        </button>
      </div>
      <Grid theGrid={gridFull} callback={switchBox} />
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
