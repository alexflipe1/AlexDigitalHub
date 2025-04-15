import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Direction = "up" | "down" | "left" | "right";
type Position = { x: number; y: number };

export default function GameSnake() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  
  // Using refs for game state that doesn't need to trigger re-renders
  const gameLoopRef = useRef<number | null>(null);
  const snakeRef = useRef<Position[]>([{ x: 5, y: 5 }]);
  const foodRef = useRef<Position>({ x: 10, y: 10 });
  const directionRef = useRef<Direction>("right");
  const nextDirectionRef = useRef<Direction>("right");
  const gridSizeRef = useRef(20);
  const gridWidthRef = useRef(0);
  const gridHeightRef = useRef(0);

  const initializeGame = () => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    gridWidthRef.current = Math.floor(containerWidth / gridSizeRef.current);
    gridHeightRef.current = Math.floor(containerHeight / gridSizeRef.current);
    
    snakeRef.current = [{ x: 5, y: 5 }];
    directionRef.current = "right";
    nextDirectionRef.current = "right";
    generateFood();
    setScore(0);
  };

  const generateFood = () => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridWidthRef.current),
        y: Math.floor(Math.random() * gridHeightRef.current)
      };
    } while (
      snakeRef.current.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    
    foodRef.current = newFood;
  };

  const startGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    initializeGame();
    setIsPlaying(true);
    
    gameLoopRef.current = window.setInterval(() => {
      moveSnake();
      drawGame();
    }, 150);
  };

  const gameOver = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setIsPlaying(false);
  };

  const moveSnake = () => {
    directionRef.current = nextDirectionRef.current;
    
    // Calculate new head position
    const head = { ...snakeRef.current[0] };
    
    switch (directionRef.current) {
      case "up":
        head.y = (head.y - 1 + gridHeightRef.current) % gridHeightRef.current;
        break;
      case "down":
        head.y = (head.y + 1) % gridHeightRef.current;
        break;
      case "left":
        head.x = (head.x - 1 + gridWidthRef.current) % gridWidthRef.current;
        break;
      case "right":
        head.x = (head.x + 1) % gridWidthRef.current;
        break;
    }
    
    // Check if snake hits itself
    if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
      gameOver();
      return;
    }
    
    // Add new head to snake
    snakeRef.current.unshift(head);
    
    // Check if snake eats food
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      generateFood();
      setScore(prev => prev + 10);
    } else {
      // Remove tail if no food eaten
      snakeRef.current.pop();
    }
  };

  const drawGame = () => {
    if (!containerRef.current) return;
    
    // Clear previous game elements
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    // Draw snake
    snakeRef.current.forEach((segment, index) => {
      const pixel = document.createElement("div");
      pixel.style.position = "absolute";
      pixel.style.left = `${segment.x * gridSizeRef.current}px`;
      pixel.style.top = `${segment.y * gridSizeRef.current}px`;
      pixel.style.width = `${gridSizeRef.current}px`;
      pixel.style.height = `${gridSizeRef.current}px`;
      pixel.style.backgroundColor = index === 0 ? "#10B981" : "#34D399";
      pixel.style.borderRadius = "2px";
      containerRef.current?.appendChild(pixel);
    });
    
    // Draw food
    const food = document.createElement("div");
    food.style.position = "absolute";
    food.style.left = `${foodRef.current.x * gridSizeRef.current}px`;
    food.style.top = `${foodRef.current.y * gridSizeRef.current}px`;
    food.style.width = `${gridSizeRef.current}px`;
    food.style.height = `${gridSizeRef.current}px`;
    food.style.backgroundColor = "#EF4444";
    food.style.borderRadius = "50%";
    containerRef.current?.appendChild(food);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "down") {
            nextDirectionRef.current = "up";
          }
          break;
        case "ArrowDown":
          if (directionRef.current !== "up") {
            nextDirectionRef.current = "down";
          }
          break;
        case "ArrowLeft":
          if (directionRef.current !== "right") {
            nextDirectionRef.current = "left";
          }
          break;
        case "ArrowRight":
          if (directionRef.current !== "left") {
            nextDirectionRef.current = "right";
          }
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="border-2 border-gray-200 rounded-lg h-64 bg-black relative shadow-inner"
      >
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 text-white">
            <Button onClick={startGame} className="bg-primary hover:bg-primary/90 shadow-sm">
              Começar Jogo
            </Button>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary/90 px-3 py-1 rounded-full text-white font-semibold text-sm">
          Score: {score}
        </div>
      </div>
    </>
  );
}
