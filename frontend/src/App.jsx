import { useState } from "react";
import VsGame from "./components/VsGame";
import SingleGame from "./components/SingleGame";
import { Button } from "@material-tailwind/react";

function App() {
  const [gameType, setGameType] = useState(null);

  const playVsGame = () => setGameType("VS");

  const playSingleGame = () => setGameType("SINGLE");

  return (
    <>
      <Button onClick={playVsGame}>Play vs another player</Button>
      <Button onClick={playSingleGame}>Play single game</Button>
      {gameType === "VS" && <VsGame />}
      {gameType === "SINGLE" && <SingleGame />}
    </>
  );
}

export default App;
