import { useState, useEffect } from "react";
import { socket } from "./sockets/socket";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import {
  Routes,
  Route,
  useNavigate,
  useMatch,
  redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  roundScoresReceived,
  roundScoresReset,
} from "./reducers/roundScoreReducer";
import { calculateHpDamage } from "./utils/scoreUtils";
import { removedHP } from "./reducers/hpReducer";
import {
  gameStarted,
  gameEnded,
  roundStarted,
  roundEnded,
  gameWon,
} from "./reducers/vsGameReducer";
import {
  playerGuessesReceived,
  guessesReset,
} from "./reducers/roundGuessesReducer";
import {
  vsGameChosen,
  singleGameChosen,
  gameTypeReset,
} from "./reducers/gameTypeReducer";
import Hero from "./components/Hero";
import Room from "./components/Rooms/Room";
import LogIn from "./components/Authentication/LogIn";
import Registration from "./components/Authentication/Registration";
import About from "./components/About";
import RoomControls from "./components/Rooms/RoomControls";
import NavBar from "./components/Navigation/NavBar";
import MainPageShield from "./components/MainPageShield";
import UserProfile from "./components/Users/UserProfile";
import Test from "./components/Test";
import { rooms } from "./data/rooms";
import { useMutation } from "@tanstack/react-query";
import loginService from "./services/login";
import { saveUser, getUser, removeUser } from "./utils/localStorageUtils";
import usersService from "./services/users";
import { useSelector } from "react-redux";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [vsGameLocation, setVsGameLocation] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [joiningUserRoomRegion, setJoiningUserRoomRegion] = useState("");
  const [pageShielded, setPageShielded] = useState(true);
  const [user, setUser] = useState(null);

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
      dispatch(gameStarted());
    };

    const onEndGame = () => {
      console.log("ending game");
      // need to unite these into one to follow redux tk best practices
      dispatch(gameEnded());
      dispatch(gameTypeReset());
      dispatch(guessesReset());
    };

    const onLocationFetched = (location) => {
      console.log("fetching random location...");
      setVsGameLocation(location);
    };

    const onRoomChosen = (roomRegion) => {
      console.log("room is chosen", roomRegion);
      setJoiningUserRoomRegion(roomRegion);
      dispatch(vsGameChosen());
    };

    const onRoundStart = (location) => {
      console.log("Round starting with location:", location);
      setVsGameLocation(location);
      dispatch(roundStarted());

      dispatch(roundScoresReset());
      dispatch(guessesReset());
    };

    const onRoundEnd = () => {
      console.log("end round event received, ending round...");
      dispatch(roundEnded());
    };

    const onScoresSet = (player1Score, player2Score) => {
      console.log(
        "settings scores for obth players",
        player1Score,
        player2Score
      );
      dispatch(roundScoresReceived({ player1Score, player2Score }));
      removeHpFromPlayer(player1Score, player2Score);
    };

    const onPlayerGuessesReceived = (player1Guess, player2Guess) => {
      dispatch(playerGuessesReceived({ player1Guess, player2Guess }));
    };

    const onGodReset = () => {
      dispatch(gameEnded());
      dispatch(gameTypeReset());
    };

    const onGameWon = (winner) => {
      console.log("game won event", winner);
      dispatch(gameWon(winner));
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
    socket.on("guesses set", onPlayerGuessesReceived);
    socket.on("god reset", onGodReset);
    socket.on("game won", onGameWon);

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
      socket.off("guesses set", onPlayerGuessesReceived);
      socket.off("god reset", onGodReset);
      socket.off("game won", onGameWon);
    };
  }, []);

  useEffect(() => {
    const loggedUser = getUser();
    console.log("logged user in app effect", loggedUser);
    if (loggedUser && loggedUser != null) {
      setUser(loggedUser);
      usersService.setToken(user?.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regionMatch = useMatch("/rooms/:region");
  const room = regionMatch
    ? rooms.find((room) => room.region === regionMatch.params.region)
    : null;

  const playVsGame = () => {
    // setGameType("VS");
    dispatch(vsGameChosen());
    navigate("/lobby");
  };

  const playSingleGame = () => {
    // setGameType("SINGLE");
    dispatch(singleGameChosen());
    navigate("/rooms");
  };

  const removeHpFromPlayer = (player1Score, player2Score) => {
    // these are 0, need to find a way to grab this state to make the calculations
    const hpRemovalValue = calculateHpDamage(player1Score, player2Score);
    console.log("hp removal value", hpRemovalValue);

    // there will be a difference between scores in 99.99% of cases, and even if there
    // isnt, the amount of hp being removed will be 0. So, no sense in trying to fix
    // for this edge case atm or maybe ever
    if (player1Score > player2Score) {
      dispatch(removedHP({ player: "p2", amount: hpRemovalValue }));
    }

    if (player1Score < player2Score) {
      dispatch(removedHP({ player: "p1", amount: hpRemovalValue }));
    }
  };

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (data) => {
      console.log("login mutation", data);
      setUser(data);
      saveUser(JSON.stringify(data));
      usersService.setToken(data.token);
      navigate("/");
    },
  });

  const handleLogin = async (credentials) => {
    loginMutation.mutate(credentials);
  };

  const handleLogout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div>
      {pageShielded && (
        <MainPageShield handlePageUnshield={() => setPageShielded(false)} />
      )}

      <NavBar user={user} handleLogout={handleLogout} />

      <APIProvider apiKey={API_KEY}>
        <Routes>
          <Route
            path="/"
            element={
              <Hero playSingleGame={playSingleGame} playVsGame={playVsGame} />
            }
          />
          <Route path="/rooms" element={<RoomsList rooms={rooms} />} />
          <Route
            path="/rooms/:region"
            element={
              <Room
                room={room}
                vsGameLocation={vsGameLocation}
                roomCode={roomCode}
              />
            }
          />
          <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route
            path="/lobby"
            element={
              <RoomControls
                rooms={rooms}
                roomCode={roomCode}
                setRoomCode={setRoomCode}
                joiningUserRoomRegion={joiningUserRoomRegion}
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
