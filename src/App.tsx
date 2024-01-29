import { useEffect, useMemo, useState } from "react";
import "./App.css";
// function Timer(){
// }
type Color = {
  name: string;
  color: string;
  correct: boolean;
};
const COLORS: Color[] = [
  {
    name: "red",
    color: "#f00",
    correct: false,
  },
  {
    name: "green",
    color: "#0f0",
    correct: false,
  },
  {
    name: "blue",
    color: "#00f",
    correct: false,
  },
  {
    name: "yellow",
    color: "#ff0",
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
        <h1>{score} Score</h1>
        <h1>{time} Seconds</h1>
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
        {status === "initial" && <button onClick={handlePlay}>Play</button>}
        {status === "finished" && (
          <button onClick={() => setStatus("initial")}>Play again</button>
        )}
        {status === "playing" && (
          <>
            <button
              onClick={() => handleColorClick(gameColors[0])}
              style={{
                width: 128,
                height: 128,
                backgroundColor: gameColors[0].color,
              }}
            ></button>
            <button
              onClick={() => handleColorClick(gameColors[1])}
              style={{
                width: 128,
                height: 128,
                backgroundColor: gameColors[1].color,
              }}
            ></button>
          </>
        )}
      </footer>
    </main>
  );
}

export default App;
