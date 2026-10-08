"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Direction = "up" | "down" | "left" | "right";
type Cell = { x: number; y: number };

const GRID_SIZE = 18;
const GAME_SPEED_MS = 115;
const TRIGGER = "nardi";
const IDLE_BEFORE_TRIGGER_MS = 3000;

function randomFood(snake: Cell[]) {
  const occupied = new Set(snake.map((part) => `${part.x},${part.y}`));
  let next = { x: 0, y: 0 };

  do {
    next = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (occupied.has(`${next.x},${next.y}`));

  return next;
}

function isOpposite(current: Direction, next: Direction) {
  return (
    (current === "up" && next === "down") ||
    (current === "down" && next === "up") ||
    (current === "left" && next === "right") ||
    (current === "right" && next === "left")
  );
}

function nextHead(head: Cell, direction: Direction): Cell {
  if (direction === "up") return { x: head.x, y: head.y - 1 };
  if (direction === "down") return { x: head.x, y: head.y + 1 };
  if (direction === "left") return { x: head.x - 1, y: head.y };
  return { x: head.x + 1, y: head.y };
}

export default function EasterEggSnake() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [snake, setSnake] = useState<Cell[]>([]);
  const [food, setFood] = useState<Cell>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const directionRef = useRef<Direction>("right");
  const openRef = useRef(false);
  const runningRef = useRef(false);
  const gameOverRef = useRef(false);
  const lastLetterTimeRef = useRef(0);
  const armedRef = useRef(false);
  const sequenceIndexRef = useRef(0);

  useEffect(() => {
    openRef.current = open;
    runningRef.current = running;
    gameOverRef.current = gameOver;
  }, [open, running, gameOver]);

  const resetGame = () => {
    const startSnake = [
      { x: 7, y: 9 },
      { x: 6, y: 9 },
      { x: 5, y: 9 },
    ];

    directionRef.current = "right";
    setSnake(startSnake);
    setFood(randomFood(startSnake));
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  useEffect(() => {
    const onType = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const key = typeof event.key === "string" ? event.key : "";
      if (key.length !== 1) return;

      const char = key.toLowerCase();
      if (!/[a-z]/.test(char)) return;

      const now = Date.now();
      const idleFor = now - lastLetterTimeRef.current;
      if (idleFor >= IDLE_BEFORE_TRIGGER_MS) {
        armedRef.current = true;
        sequenceIndexRef.current = 0;
      }
      lastLetterTimeRef.current = now;

      if (!armedRef.current) return;

      const expectedChar = TRIGGER[sequenceIndexRef.current];
      if (char !== expectedChar) {
        armedRef.current = false;
        sequenceIndexRef.current = 0;
        return;
      }

      sequenceIndexRef.current += 1;
      if (sequenceIndexRef.current === TRIGGER.length) {
        armedRef.current = false;
        sequenceIndexRef.current = 0;
        setOpen(true);
        resetGame();
      }
    };

    const onCommand = () => {
      setOpen(true);
      resetGame();
    };

    window.addEventListener("keydown", onType);
    window.addEventListener("devleonardis:snake", onCommand);

    return () => {
      window.removeEventListener("keydown", onType);
      window.removeEventListener("devleonardis:snake", onCommand);
    };
  }, []);

  useEffect(() => {
    if (!open || !running || gameOver || snake.length === 0) return;

    const tick = window.setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const future = nextHead(head, directionRef.current);

        const outside =
          future.x < 0 || future.x >= GRID_SIZE || future.y < 0 || future.y >= GRID_SIZE;

        const selfHit = prevSnake.some((part) => part.x === future.x && part.y === future.y);

        if (outside || selfHit) {
          setRunning(false);
          setGameOver(true);
          return prevSnake;
        }

        const ateFood = future.x === food.x && future.y === food.y;
        const nextSnake = [future, ...prevSnake];

        if (!ateFood) {
          nextSnake.pop();
        } else {
          setScore((value) => value + 1);
          setFood(randomFood(nextSnake));
        }

        return nextSnake;
      });
    }, GAME_SPEED_MS);

    return () => {
      window.clearInterval(tick);
    };
  }, [food, gameOver, open, running, snake.length]);

  useEffect(() => {
    if (!open) return;

    const onControl = (event: KeyboardEvent) => {
      const key = typeof event.key === "string" ? event.key.toLowerCase() : "";
      if (!key) return;
      const map: Record<string, Direction> = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
      };

      if (key === " ") {
        event.preventDefault();
        if (!gameOverRef.current) {
          setRunning((value) => !value);
        }
        return;
      }

      const nextDirection = map[key];
      if (!nextDirection) return;

      event.preventDefault();
      if (isOpposite(directionRef.current, nextDirection)) return;

      directionRef.current = nextDirection;
    };

    window.addEventListener("keydown", onControl);

    return () => {
      window.removeEventListener("keydown", onControl);
    };
  }, [open]);

  const snakeCells = useMemo(
    () => new Set(snake.map((part) => `${part.x},${part.y}`)),
    [snake],
  );

  const cells = useMemo(() => {
    const grid: Array<{ key: string; type: "snake" | "food" | "empty" | "head" }> = [];

    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        const key = `${x},${y}`;

        if (snake[0] && snake[0].x === x && snake[0].y === y) {
          grid.push({ key, type: "head" });
        } else if (food.x === x && food.y === y) {
          grid.push({ key, type: "food" });
        } else if (snakeCells.has(key)) {
          grid.push({ key, type: "snake" });
        } else {
          grid.push({ key, type: "empty" });
        }
      }
    }

    return grid;
  }, [food.x, food.y, snake, snakeCells]);

  const text =
    locale === "it"
      ? {
          title: "Snake // Easter Egg",
          desc: "Controlli: frecce o WASD. Spazio per pausa.",
          score: "Punteggio",
          gameOver: "Game over",
          restart: "Rigioca",
          close: "Chiudi",
        }
      : {
          title: "Snake // Easter Egg",
          desc: "Controls: arrows or WASD. Space to pause.",
          score: "Score",
          gameOver: "Game over",
          restart: "Play again",
          close: "Close",
        };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[94vw] border-white/10 bg-ink p-4 sm:max-w-lg sm:p-5">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-phosphor">{text.title}</DialogTitle>
          <DialogDescription className="text-zinc-300">{text.desc}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm">
            <span className="text-zinc-300">
              {text.score}: <strong className="text-phosphor">{score}</strong>
            </span>
            {gameOver ? <span className="text-red-400">{text.gameOver}</span> : null}
          </div>

          <div
            className="mx-auto grid aspect-square w-full max-w-[360px] grid-cols-[repeat(18,minmax(0,1fr))] gap-px rounded-lg border border-white/10 bg-zinc-900 p-2 sm:max-w-[390px]"
            role="application"
            aria-label="Snake game board"
          >
            {cells.map((cell) => (
              <div
                key={cell.key}
                className={
                  cell.type === "head"
                    ? "rounded-[2px] bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                    : cell.type === "snake"
                      ? "rounded-[2px] bg-emerald-500/85"
                      : cell.type === "food"
                        ? "rounded-[2px] bg-sodium"
                        : "rounded-[2px] bg-zinc-800/55"
                }
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={resetGame} className="bg-phosphor text-ink hover:bg-phosphor/85">
              {text.restart}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-white/15 bg-transparent text-zinc-200 hover:bg-white/10"
            >
              {text.close}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
