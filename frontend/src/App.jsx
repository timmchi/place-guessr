import { useState, useEffect } from "react";
import { socket } from "./sockets/socket";
import RoomsList from "./components/Rooms/RoomsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Routes, Route, useNavigate, useMatch } from "react-router-dom";
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
  roundDistanceReceived,
  roundDistanceReset,
} from "./reducers/roundDistanceReducer";
import {
  vsGameChosen,
  singleGameChosen,
  gameTypeReset,
} from "./reducers/gameTypeReducer";
import {
  firstPlayerJoined,
  secondPlayerJoined,
} from "./reducers/roomPlayersReducer";
import { playerIdReceived } from "./reducers/playerIdReducer";
import { newLocationFetched } from "./reducers/panoramaErrorReducer";
import { initializeUser, userLoggedOut } from "./reducers/userReducer";
import { codeSubmitted } from "./reducers/roomCodeReducer";
import Hero from "./components/Pages/Hero";
import Room from "./components/Rooms/Room";
import LogIn from "./components/Authentication/LogIn";
import Registration from "./components/Authentication/Registration";
import About from "./components/Pages/About";
import RoomControls from "./components/Rooms/RoomControls";
import NavBar from "./components/Navigation/NavBar";
import MainPageShield from "./components/Screens/MainPageShield";
import UserProfile from "./components/Users/UserProfile";
import Test from "./components/Test";
import { rooms } from "./data/rooms";
import { useMutation } from "@tanstack/react-query";
import loginService from "./services/login";
import { saveUser, getUser, removeUser } from "./utils/localStorageUtils";
import { useSelector } from "react-redux";
import GeonamesErrorScreen from "./components/Screens/GeonamesErrorScreen";
import Notification from "./components/SmallComponents/Notification";
import useNotification from "./hooks/useNotification";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [vsGameLocation, setVsGameLocation] = useState(null);
  const [joiningUserRoomRegion, setJoiningUserRoomRegion] = useState("");
  const [pageShielded, setPageShielded] = useState(true);
  const [geonamesError, setGeonamesError] = useState(null);
  const { displayNotification } = useNotification();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const onAnswer = (playerId) => {
      console.log(playerId, "submitted answer");
    };

    const onCreateRoom = (roomId) => {
      console.log(roomId, "was created");

      // ROOM CODE HERE
      dispatch(codeSubmitted(roomId));
    };

    const onJoiningRoom = (player, roomId, roomRegion) => {
      console.log(`${player} joined ${roomId}`);
      setJoiningUserRoomRegion(roomRegion);
      dispatch(vsGameChosen());
    };

    // here is where we update the players in the room state
    const onPlayerJoined = (
      // playerIdentifier is either p1 or p2 and is used in game logic mostly in frontend
      playerIdentifier,
      player1Object,
      player2Object
    ) => {
      console.log(playerIdentifier, player1Object, player2Object);

      if (playerIdentifier === "p1")
        dispatch(firstPlayerJoined({ player1Object }));

      if (playerIdentifier === "p2") {
        dispatch(secondPlayerJoined({ player2Object }));
        dispatch(firstPlayerJoined({ player1Object }));
      }
    };

    const onUsers = (value) => console.log("users", value);

    const onPlayerIdSet = (playerId) => {
      console.log("player id set", playerId);
      // what do we do with the playerId here?
      // playerId will need to be set in the global state and then used on guess submissions and continuing round, basically in all events which backend checks against its room data

      // we need the player here as an object because we check for null to see
      // if the player has joined the room AND is not logged in to then add a guest to the room
      dispatch(playerIdReceived(playerId));
    };

    const onStartGame = () => {
      console.log("starting game");
      dispatch(gameStarted());
    };

    // Here is where we set the location for the vs game. We receive it from the event on the backend
    const onLocationFetched = (location) => {
      console.log("fetching random location...");
      // so, when the geonames returns the incorrectly formatted data, it will first arrive from backend here and then the incorrect data will go from here to the streetview
      setVsGameLocation(location);

      // this controls the panoramaError which happens in StreetView if the panorama is not found
      // for the location
      // the issue is that this makes it difficult to test
      dispatch(newLocationFetched());
    };

    // add builders here
    const onRoundStart = (location) => {
      console.log("Round starting with location:", location);
      // so, when the geonames returns the incorrectly formatted data, it will first arrive from backend here and then the incorrect data will go from here to the streetview
      setVsGameLocation(location);
      dispatch(roundStarted());

      dispatch(roundScoresReset());
      dispatch(guessesReset());
      dispatch(roundDistanceReset());
    };

    const onRoundEnd = () => {
      console.log("end round event received, ending round...");
      dispatch(roundEnded());
    };

    const onScoresSet = (
      player1Score,
      player1Distance,
      player2Score,
      player2Distance
    ) => {
      dispatch(roundScoresReceived({ player1Score, player2Score }));
      dispatch(roundDistanceReceived({ player1Distance, player2Distance }));
      removeHpFromPlayer(player1Score, player2Score);
    };

    const onPlayerGuessesReceived = (player1Guess, player2Guess) => {
      dispatch(playerGuessesReceived({ player1Guess, player2Guess }));
    };

    // add builders here
    const onGodReset = () => {
      dispatch(gameEnded());
      dispatch(gameTypeReset());
    };

    const onGameWon = (winner) => {
      console.log("game won event", winner);

      // so that we see the results of the last round
      setTimeout(() => dispatch(gameWon(winner)), 5000);
    };

    // we could for example set some state based on this event, and based on that state, we render an error component
    const onGeonamesError = (error) => {
      console.log("geonames error procced", error);
      setGeonamesError(error);
    };

    const onOpponentGuessed = () => {
      // I dont know if I want to keep it like this or do it in a different way
      // it feels like just a simple info notification is not enough, and there
      // should be a different styled message in the street view instead
      // however, notification here does fit pretty well in terms of using
      // what i've already built... We will see, but for now, this will stay
      // tbh, it depends on how important I want to make this detail for the game
      // if its just a message, then a notification is enough, but if I want to
      // set up like a 30 sec timer for the other player, then this implementation
      // will be changed to use redux, etc...
      displayNotification("info", "Your opponent just submitted their guess!");
    };

    socket.on("users", onUsers);
    socket.on("submit answer", onAnswer);
    socket.on("room joined", onJoiningRoom);
    socket.on("start game", onStartGame);
    socket.on("fetched location", onLocationFetched);
    socket.on("room created", onCreateRoom);
    socket.on("start round", onRoundStart);
    socket.on("end round", onRoundEnd);
    socket.on("scores set", onScoresSet);
    socket.on("guesses set", onPlayerGuessesReceived);
    socket.on("god reset", onGodReset);
    socket.on("game won", onGameWon);
    socket.on("player joined", onPlayerJoined);
    socket.on("geonames error", onGeonamesError);
    socket.on("playerId set", onPlayerIdSet);
    socket.on("opponent guessed", onOpponentGuessed);

    return () => {
      socket.off("users", onUsers);
      socket.off("submit answer", onAnswer);
      socket.off("room joined", onJoiningRoom);
      socket.off("start game", onStartGame);
      socket.off("fetched location", onLocationFetched);
      socket.off("room created", onCreateRoom);
      socket.off("start round", onRoundStart);
      socket.off("end round", onRoundEnd);
      socket.off("scores set", onScoresSet);
      socket.off("guesses set", onPlayerGuessesReceived);
      socket.off("god reset", onGodReset);
      socket.off("game won", onGameWon);
      socket.off("player joined", onPlayerJoined);
      socket.off("geonames error", onGeonamesError);
      socket.off("playerId set", onPlayerIdSet);
      socket.off("opponent guessed", onOpponentGuessed);
    };
  }, []);

  useEffect(() => {
    const loggedUser = getUser();
    console.log("logged user in app effect", loggedUser);
    if (loggedUser && loggedUser != null) {
      dispatch(initializeUser(JSON.parse(loggedUser)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regionMatch = useMatch("/rooms/:region");
  const room = regionMatch
    ? rooms.find((room) => room.region === regionMatch.params.region)
    : null;

  const playVsGame = () => {
    dispatch(vsGameChosen());
    navigate("/lobby");
  };

  const playSingleGame = () => {
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
      saveUser(JSON.stringify(data));
      dispatch(initializeUser(data));
      navigate("/");
      displayNotification("success", "Successfully logged in");
    },
    onError: (error) => {
      console.log(error.message);
      displayNotification(
        "error",
        "Incorrect credentials or user does not exist."
      );
    },
  });

  const handleLogin = async (credentials) => {
    loginMutation.mutate(credentials);
  };

  // this will also need to be changed to use redux, which means a logout will need to be added to user slice
  const handleLogout = () => {
    removeUser();
    dispatch(userLoggedOut());
    navigate("/");
    displayNotification("success", "Successfully logged out");
  };

  const handleGeonamesError = () => {
    setGeonamesError(null);
    dispatch(gameEnded());
  };

  // game state needs to be reset also, prolly should be done in the setgeonameserror that we are passing
  if (geonamesError)
    return (
      <GeonamesErrorScreen
        error={geonamesError}
        handleGeonamesError={handleGeonamesError}
      />
    );

  return (
    <div>
      {/* keep in prod but no need in dev */}
      {/* {pageShielded && (
        <MainPageShield handlePageUnshield={() => setPageShielded(false)} />
      )} */}

      <APIProvider apiKey={API_KEY}>
        <NavBar handleLogout={handleLogout} />
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
            element={<Room room={room} vsGameLocation={vsGameLocation} />}
          />
          <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route
            path="/lobby"
            element={
              <RoomControls
                rooms={rooms}
                joiningUserRoomRegion={joiningUserRoomRegion}
                vsGameLocation={vsGameLocation}
              />
            }
          />
        </Routes>
        <Notification />
      </APIProvider>
    </div>
  );
}

export default App;
