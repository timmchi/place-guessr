import { useState } from "react";
import Round from "./components/Round";

const players = [
  { id: 1, name: "Kariz" },
  { id: 2, name: "Sheldon" },
];

function App() {
  const [round, setRound] = useState(1);

  const handleNextRound = () => setRound(round + 1);

  return (
    <>
      <Round
        players={players}
        round={round}
        handleNextRound={handleNextRound}
      />
    </>
  );
}

export default App;
