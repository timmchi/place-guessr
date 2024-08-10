import { useState } from "react";
import VsGame from "./components/VsGame/VsGame";
import SingleGame from "./components/SingleGame/SingleGame";
import { Button } from "@material-tailwind/react";

function App() {
  const [gameType, setGameType] = useState(null);

  const playVsGame = () => setGameType("VS");

  const playSingleGame = () => setGameType("SINGLE");

  return (
    <>
      <div className="flex p-2 gap-4">
        <Button onClick={playVsGame}>Play vs another player</Button>
        <Button onClick={playSingleGame}>Play single game</Button>
      </div>
      {gameType === "VS" && <VsGame />}
      {gameType === "SINGLE" && <SingleGame />}
    </>
  );
}

export default App;
