import { useState } from "react";
import Player from "./components/Player";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Player />
      <Player />
    </>
  );
}

export default App;
