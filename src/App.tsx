import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Color = {
  name: string;
  color: string;
  correct: boolean;
};
const COLORS: Color[] = [
  {
    name: "red",
    color: "#FF6B6C",
    correct: false,
  },
  {
    name: "green",
    color: "#2EEC8A",
    correct: false,
  },
  {
    name: "blue",
    color: "#4696FF",
    correct: false,
  },
  {
    name: "yellow",
    color: "#FFC145",
    correct: false,
  },
  {
    name: "purple",
    color: "#5B5F97",
    correct: false,
  },
];

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial"
  );
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [gameColors, setGameColors] = useState<Color[]>([]);
  const correctColor = useMemo<Color>(
    () => gameColors.find((color) => color.correct)!,
    [gameColors]
  );
  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    const [correctColor, wrongColor] = COLORS.slice().sort(
      () => Math.random() - 0.5
    );

    setGameColors(
      [{ ...correctColor, correct: true }, wrongColor].sort(
        () => Math.random() - 0.5
      )
    );
  }

  function handleColorClick(clickedColor: Color) {
    if (clickedColor.correct) {
      setScore((score) => score + 1);

      if (score === 9) {
        setStatus("finished");
      } else {
        const [correctColor, wrongColor] = COLORS.slice().sort(
          () => Math.random() - 0.5
        );

        setGameColors(
          [{ ...correctColor, correct: true }, wrongColor].sort(
            () => Math.random() - 0.5
          )
        );
      }
    }
  }

  useEffect(() => {
    let interval: number;

    if (status === "playing") {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <main>
      <header>
        <h4>{score} Score</h4>
        <h4>{time} Seconds</h4>
      </header>
      {status === "playing" && (
        <section>
          <span
            style={{ textTransform: "capitalize", color: gameColors[0].color }}
          >
            {correctColor.name}
          </span>
        </section>
      )}
      <footer>
        {status === "initial" && (
          <button className="btn btn-secondary" onClick={handlePlay}>
            Play
          </button>
        )}
        {status === "finished" && (
          <button
            className="btn btn-secondary"
            onClick={() => setStatus("initial")}
          >
            Play again
          </button>
        )}
        {status === "playing" && (
          <div>
            <button
              className="btn"
              onClick={() => handleColorClick(gameColors[0])}
              style={{
                margin: 50,
                width: 128,
                height: 128,
                backgroundColor: gameColors[0].color,
              }}
            ></button>
            <button
              className="btn"
              onClick={() => handleColorClick(gameColors[1])}
              style={{
                width: 128,
                height: 128,
                backgroundColor: gameColors[1].color,
              }}
            ></button>
          </div>
        )}
      </footer>
    </main>
  );
}

export default App;
