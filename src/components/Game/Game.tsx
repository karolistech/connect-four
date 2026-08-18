import { useState } from "react";

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

  return (
    <div className="game">
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
