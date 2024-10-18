import { Button, Typography, Avatar } from "@material-tailwind/react";
import VsGame from "../VsGame/VsGame";
import PlayerInLobby from "../Player/PlayerInLobby";
import { useSelector } from "react-redux";
import { socket } from "../../sockets/socket";
import LoadingScreen from "../Screens/LoadingScreen";

const RoomLobby = ({ room, vsGameLocation, handleGoingBack, roomCode }) => {
  const gameStarted = useSelector((state) => state.vsGame.vsGameStarted);

  const playersInLobby = useSelector((state) => state.roomPlayers);
  console.log("players in lobby from redux state", playersInLobby);

  // This is where we ask for the first location to be fetched when the game starts
  const handleGameStart = () => {
    // we will also send the mapSize here that will be used to calculate the score properly
    // this place seems like the most appropriate due to how the architecture is set up atm
    socket.emit("start game", roomCode, room.mapSize, room.region);
    socket.emit(
      "fetch location",
      room.region === "random" ? "geolist" : "geonames",
      room.region,
      roomCode
    );
  };

  if (!room) return <LoadingScreen />;

  if (!gameStarted) {
    return (
      <div className="flex bg-indigo-200 min-h-screen justify-center items-center">
        <div className="self-start mx-4 md:w-[50%] bg-indigo-400 md:mx-auto rounded-lg shadow-md my-auto text-white">
          <div className="flex gap-4 justify-center pt-12">
            <Typography variant="h1" className="text-center pt-2">
              {room.title}
            </Typography>
            <Avatar
              size="xl"
              variant="circular"
              alt={`flag of ${
                room.region !== "random" ? room.title : "the world"
              }`}
              className="border-2 border-indigo-700"
              src={room.flag}
            />
          </div>
          <div className="py-20 text-center">
            <Typography variant="h1" className="text-yellow-600 pb-8">
              {roomCode}
            </Typography>
            <Typography variant="h5">
              Send this code to the person you want to play with
            </Typography>
          </div>
          <div className="flex flex-col justify-center text-center">
            <Typography variant="h3">Joined users</Typography>
            <ul className="flex gap-4 justify-center mt-8">
              {/* this should show a logged in player profile, or a "Guest" profile if the user is nto logged in
              maybe make this clickable so that it opens users profile? is there a point?.. 
              clickable so that the profile is opened in a new tab maybe */}
              {playersInLobby.player1 && (
                <PlayerInLobby
                  player={playersInLobby.player1.player1Object}
                  playerVariant="p1"
                />
              )}
              {playersInLobby.player2 && (
                <PlayerInLobby
                  player={playersInLobby.player2.player2Object}
                  playerVariant="p2"
                />
              )}
            </ul>
          </div>
          <div className="flex gap-4 justify-center py-8">
            <Button
              onClick={handleGameStart}
              disabled={!(playersInLobby.player1 && playersInLobby.player2)}
              className="bg-green-700 hover:bg-green-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {playersInLobby.player1 && playersInLobby.player2
                ? "Start the game"
                : "Waiting for the 2nd player"}
            </Button>
            <Button
              onClick={handleGoingBack}
              className="bg-deep-purple-300 hover:bg-deep-purple-400"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No point in passing roomCode here, because VsGame just does nothing with it and passes down to round
  return (
    <VsGame
      roomMapType={room.region === "random" ? "world" : "country"}
      roomTitle={room.title}
      region={room.region}
      vsGameLocation={vsGameLocation}
    />
  );
};

export default RoomLobby;
