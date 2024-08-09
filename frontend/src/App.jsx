import { useState } from "react";
import VsGame from "./components/VsGame";
import { Button } from "@material-tailwind/react";

function App() {
  const [gameType, setGameType] = useState(null);

  const playVsGame = () => setGameType("VS");

  const playSingleGame = () => setGameType("SINGLE");

  return (
    <>
      <Button onClick={playVsGame}>Play vs another player</Button>
      <Button onClick={playSingleGame}>Play vs another player</Button>
      {gameType === "VS" && <VsGame />}
    </>
  );
}

export default App;
