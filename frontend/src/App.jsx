import { useState } from "react";
import VsGame from "./components/VsGame/VsGame";
import SingleGame from "./components/SingleGame/SingleGame";
import RoomsList from "./components/Rooms/RoomsList";
import LocationFetcher from "./components/Map/LocationFetcher";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Button } from "@material-tailwind/react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [gameType, setGameType] = useState(null);

  const playVsGame = () => setGameType("VS");

  const playSingleGame = () => setGameType("SINGLE");

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        {/* <LocationFetcher /> */}
        <div className="flex p-2 gap-4">
          <Button onClick={playVsGame}>Play vs another player</Button>
          <Button onClick={playSingleGame}>Play single game</Button>
        </div>
        {/* {gameType === "VS" && <VsGame />}
        {gameType === "SINGLE" && <SingleGame />} */}
        <RoomsList type={gameType} />
      </APIProvider>
    </>
  );
}

export default App;
