import { useState } from "react";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [gameType, setGameType] = useState(null);
  const navigate = useNavigate();

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
          <Route path="/rooms" element={<RoomsList type={gameType} />} />
        </Routes>
      </APIProvider>
    </div>
  );
}

export default App;
