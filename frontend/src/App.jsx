import { useState, useEffect } from "react";
import { socket } from "./sockets/socket";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Routes, Route, useNavigate, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Rooms/Room";
import { rooms } from "./data/rooms";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [gameType, setGameType] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const navigate = useNavigate();

  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("disconnected");
      setIsConnected(false);
    };

    const onHello = () => {
      console.log("hello wrld");
    };

    const onAnswer = (player, answer, playerId) => {
      console.log(player, answer, playerId);
    };

    const onUsers = (value) => console.log("users", value);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("users", onUsers);
    socket.on("submit answer", onAnswer);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("users", onUsers);
      socket.off("submit answer", onAnswer);
    };
  }, []);

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
