import { useState } from "react";
import Player from "./components/Player";

const players = [
  { id: 1, name: "Kariz" },
  { id: 2, name: "Sheldon" },
];

function App() {
  return (
    <>
      <div className="flex">
        <Player player={players[0]} />
        <Player player={players[1]} />
      </div>
    </>
  );
}

export default App;
