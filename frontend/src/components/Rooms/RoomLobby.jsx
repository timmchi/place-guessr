import { useState } from "react";
import { Button, Typography, Avatar } from "@material-tailwind/react";
import VsGame from "../VsGame/VsGame";
import PlayerInLobby from "../Player/PlayerInLobby";
import { useSelector } from "react-redux";
import avatar from "../../../test/vavatar.jpg";
import { socket } from "../../sockets/socket";

const players = [{ id: 1, name: "Kariz", avatar: avatar }, null];

const RoomLobby = ({ room, vsGameLocation, handleGoingBack, roomCode }) => {
  const gameStarted = useSelector((state) => state.vsGame.vsGameStarted);
  // we are gonna grab the user from the global user state here
  // actually, that means that there will only be 1 user
  // so, I will need to send the room user to the backend with the event,
  // and then send back the user info

  // Idea 1. Have the room creator as the first user in the lobby right away
  // then pass the joined user info when joining the room
  // Idea 2. Pass the user creator info to the backend with the create room event,
  // pass the 2nd user info with the join room event - This seems better
  const playersInLobby = useSelector((state) => state.roomPlayers);
  console.log("players in lobby from redux state", playersInLobby);

  const handleGameStart = () => {
    socket.emit("start game", roomCode);
    socket.emit(
      "fetch location",
      room.region === "random" ? "geolist" : "geonames",
      room.region,
      roomCode
    );
  };

  // add styling here
  if (!room) return <div>loading room...</div>;

  if (!gameStarted) {
    return (
      <div className="flex bg-indigo-200 min-h-screen justify-center items-center">
        <div className="self-start w-[50%] bg-indigo-400 mx-auto rounded-lg shadow-md my-auto text-white">
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
                <PlayerInLobby player={playersInLobby.player1.player1Object} />
              )}
              {playersInLobby.player2 && (
                <PlayerInLobby player={playersInLobby.player2.player2Object} />
              )}
              {/* <PlayerInLobby player={players[1]} /> */}
            </ul>
          </div>
          <div className="flex gap-4 justify-center py-8">
            <Button
              onClick={handleGameStart}
              className="bg-green-700 hover:bg-green-800"
            >
              Start the game
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

  return (
    <VsGame
      roomMapType={room.region === "random" ? "world" : "country"}
      roomTitle={room.title}
      region={room.region}
      vsGameLocation={vsGameLocation}
      roomCode={roomCode}
    />
  );
};

export default RoomLobby;
