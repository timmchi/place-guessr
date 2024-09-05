import { useState, useEffect } from "react";
import { socket } from "./sockets/socket";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Routes, Route, useNavigate, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roundScoresReceived } from "./reducers/roundScoreReducer";
import Hero from "./components/Hero";
import Room from "./components/Rooms/Room";
import LogIn from "./components/Authentication/LogIn";
import Registration from "./components/Authentication/Registration";
import About from "./components/About";
import RoomControls from "./components/Rooms/RoomControls";
import NavBar from "./components/Navigation/NavBar";
import Test from "./components/Test";
import { rooms } from "./data/rooms";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [gameType, setGameType] = useState(null);
  const [vsGameStarted, setVsGameStarted] = useState(false);
  const [vsGameLocation, setVsGameLocation] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [joiningUserRoomRegion, setJoiningUserRoomRegion] = useState("");
  const [vsRoundEnded, setVsRoundEnded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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

    const onRoundStart = (roomRegion, roomCode) => {
      console.log("starting round");
      console.log("joining user room region", roomRegion);
      setVsRoundEnded(false);
      socket.emit(
        "fetch location",
        roomRegion === "random" ? "geolist" : "geonames",
        roomRegion,
        roomCode
      );
    };

    const onRoundEnd = () => {
      console.log("ending round");
      setVsRoundEnded(true);
    };

    const onScoresSet = (player1Score, player2Score) => {
      console.log("settings scores for obth players");
      dispatch(roundScoresReceived(player1Score, player2Score));
    };

    socket.on("users", onUsers);
    socket.on("submit answer", onAnswer);
    socket.on("room joined", onJoiningRoom);
    socket.on("start game", onStartGame);
    socket.on("end game", onEndGame);
    socket.on("fetched location", onLocationFetched);
    socket.on("room chosen", onRoomChosen);
    socket.on("room created", onCreateRoom);
    socket.on("start round", onRoundStart);
    socket.on("end round", onRoundEnd);
    socket.on("scores set", onScoresSet);

    return () => {
      socket.off("users", onUsers);
      socket.off("submit answer", onAnswer);
      socket.off("room joined", onJoiningRoom);
      socket.off("start game", onStartGame);
      socket.off("end game", onEndGame);
      socket.off("fetched location", onLocationFetched);
      socket.off("room chosen", onRoomChosen);
      socket.off("room created", onCreateRoom);
      socket.off("start round", onRoundStart);
      socket.off("end round", onRoundEnd);
      socket.off("scores set", onScoresSet);
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
    <div>
      <NavBar />

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
                vsRoundEnded={vsRoundEnded}
                roomCode={roomCode}
              />
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
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
                vsRoundEnded={vsRoundEnded}
              />
            }
          />
        </Routes>
      </APIProvider>
    </div>
  );
}

export default App;
