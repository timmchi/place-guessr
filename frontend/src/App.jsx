import { useState } from "react";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Routes, Route, useNavigate, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Rooms/Room";
import { rooms } from "./data/rooms";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [gameType, setGameType] = useState(null);
  const navigate = useNavigate();

  const regionMatch = useMatch("/rooms/:region");
  const room = regionMatch
    ? rooms.find((room) => room.region === regionMatch.params.region)
    : null;

  const playVsGame = () => {
    setGameType("VS");
    navigate("/rooms");
  };

  const playSingleGame = () => {
    setGameType("SINGLE");
    navigate("/rooms");
  };

  return (
    <div>
      <APIProvider apiKey={API_KEY}>
        <Routes>
          <Route
            path="/"
            element={
              <Home playSingleGame={playSingleGame} playVsGame={playVsGame} />
            }
          />
          <Route
            path="/rooms"
            element={<RoomsList type={gameType} rooms={rooms} />}
          />
          <Route
            path="/rooms/:region"
            element={<Room type={gameType} room={room} />}
          />
        </Routes>
      </APIProvider>
    </div>
  );
}

export default App;
