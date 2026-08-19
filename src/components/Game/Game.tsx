import { useState } from "react";

import "./Game.css";
import icons from "@/assets/icons.svg";

type Status =
  | { type: "playing"; currentPlayer: Player }
  | { type: "win"; winner: Player }
  | { type: "draw" };

type BoardSize = "7x6" | "8x7" | "9x8";
type BoardDimensions = { cols: number; rows: number };

type Player = "red" | "yellow";
type BoardCell = Player | null;
type Board = BoardCell[][];

type Game = {
  status: Status;
  boardSize: BoardSize;
  board: Board;
};

const boardSizes: Record<BoardSize, BoardDimensions> = {
  "7x6": { cols: 7, rows: 6 },
  "8x7": { cols: 8, rows: 7 },
  "9x8": { cols: 9, rows: 8 }
};

export default function Game() {
  const [game, setGame] = useState<Game>(() => createGame("7x6"));

  const { status, board, boardSize } = game;
  const { cols } = boardSizes[boardSize];

  function changeBoardSize(boardSize: BoardSize) {
    setGame(createGame(boardSize));
  }

  return (
    <div className="game">
      <div className="panel">
        <div className="panel__board-sizes">
          <span>Board Size:</span>

          <button onClick={() => changeBoardSize("7x6")}>
            7 x 6
          </button>

          <button onClick={() => changeBoardSize("8x7")}>
            8 x 7
          </button>

          <button onClick={() => changeBoardSize("9x8")}>
            9 x 8
          </button>
        </div>
      </div>

      <div className="board">
        <div className={`board__columns board__columns--${boardSize}`}>
          {Array.from({ length: cols }, (_, colIndex) => (
            <div key={colIndex} className="board__column">
              <button className="board__drop-button">
                <svg className="board__arrow-icon">
                  <use href={`${icons}#arrow`} />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className={`board__grid board__grid--${boardSize}`}>
          {board.map((row, rowIndex) => row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="board__cell">
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

function createGame(boardSize: BoardSize): Game {
  return {
    status: { type: "playing", currentPlayer: "red" },
    boardSize: boardSize,
    board: createBoard(boardSize)
  };
}

function createBoard(boardSize: BoardSize): Board {
  const { cols, rows } = boardSizes[boardSize];

  return Array.from({ length: rows }, () => Array(cols).fill(null));
}
