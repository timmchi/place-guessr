import { useState, useEffect } from "react";
import { socket } from "./sockets/socket";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Routes, Route, useNavigate, useMatch } from "react-router-dom";
import Hero from "./components/Hero";
import Room from "./components/Rooms/Room";
import LogIn from "./components/Authentication/LogIn";
import Registration from "./components/Authentication/Registration";
import About from "./components/About";
import RoomControls from "./components/Rooms/RoomControls";
import NavBar from "./components/Navigation/NavBar";
import { rooms } from "./data/rooms";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [gameType, setGameType] = useState(null);
  const [vsGameStarted, setVsGameStarted] = useState(false);
  const [vsGameLocation, setVsGameLocation] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomCode, setRoomCode] = useState("");
  const [joiningUserRoomRegion, setJoiningUserRoomRegion] = useState("");

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

    const onAnswer = (playerId) => {
      console.log(playerId, "submitted answer");
    };

    const onCreateRoom = (roomId) => {
      console.log(roomId, "was created");
      setRoomCode(roomId);
    };

    const onJoiningRoom = (player, roomId) => {
      console.log(`${player} joined ${roomId}`);
    };

    const onUsers = (value) => console.log("users", value);

    const onStartGame = () => {
      console.log("starting game");
      setVsGameStarted(true);
    };

    const onEndGame = () => {
      console.log("ending game");
      setVsGameStarted(false);
    };

    // heres the problem :) non-standardized parameter in the backend, lets try and fix it there..
    const onLocationFetched = (location) => {
      console.log("fetching random location...");
      setVsGameLocation(location);
    };

    const onRoomChosen = (roomRegion) => {
      console.log("room is chosen", roomRegion);
      setJoiningUserRoomRegion(roomRegion);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("users", onUsers);
    socket.on("submit answer", onAnswer);
    socket.on("room joined", onJoiningRoom);
    socket.on("start game", onStartGame);
    socket.on("end game", onEndGame);
    socket.on("fetched location", onLocationFetched);
    socket.on("room chosen", onRoomChosen);
    socket.on("room created", onCreateRoom);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("users", onUsers);
      socket.off("submit answer", onAnswer);
      socket.off("room joined", onJoiningRoom);
      socket.off("start game", onStartGame);
      socket.off("end game", onEndGame);
      socket.off("fetched location", onLocationFetched);
      socket.off("room chosen", onRoomChosen);
      socket.off("room created", onCreateRoom);
    };
  }, []);

  const regionMatch = useMatch("/rooms/:region");
  const room = regionMatch
    ? rooms.find((room) => room.region === regionMatch.params.region)
    : null;

  const playVsGame = () => {
    setGameType("VS");
    navigate("/lobby");
  };

  const playSingleGame = () => {
    setGameType("SINGLE");
    navigate("/rooms");
  };

  return (
    <div className="bg-transparent">
      <APIProvider apiKey={API_KEY}>
        <Routes>
          <Route
            path="/"
            element={
              <Hero playSingleGame={playSingleGame} playVsGame={playVsGame} />
            }
          />
          <Route
            path="/rooms"
            element={<RoomsList type={gameType} rooms={rooms} />}
          />
          <Route
            path="/rooms/:region"
            element={
              <Room
                type={gameType}
                room={room}
                vsGameStarted={vsGameStarted}
                vsGameLocation={vsGameLocation}
                roomCode={roomCode}
              />
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/lobby"
            element={
              <RoomControls
                rooms={rooms}
                roomCode={roomCode}
                setRoomCode={setRoomCode}
                joiningUserRoomRegion={joiningUserRoomRegion}
                vsGameStarted={vsGameStarted}
                vsGameLocation={vsGameLocation}
              />
            }
          />
        </Routes>
      </APIProvider>
    </div>
  );
}

export default App;
