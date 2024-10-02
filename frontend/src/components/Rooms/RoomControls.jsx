import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomWasCreated, roomWasJoined } from "../../reducers/playerReducer";
import RoomLobby from "./RoomLobby";
import RoomsList from "./RoomsList";

const RoomControls = ({
  rooms,
  roomCode,
  setRoomCode,
  joiningUserRoomRegion,
  //   vsGameStarted,
  vsGameLocation,
  //   vsRoundEnded,
}) => {
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomJoined, setRoomJoined] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // changes between the user who creates the room and who joins the room.
  // If null (not logged in), will be guest
  const user = useSelector((state) => state.user);
  console.log("user in room controls", user);

  // here is the problem with the white screen and room being undefined
  const roomRegion = rooms.find(
    (room) => room.region === joiningUserRoomRegion
  );
  console.log("room region", roomRegion);
  console.log("joining room region", joiningUserRoomRegion);

  const joinRoom = (e) => {
    e.preventDefault();
    console.log("joining roooooom....");

    // here the user will be the one joining the room
    socket.emit("join room", socket.id, roomCode, user);
    setRoomJoined(true);
    dispatch(roomWasJoined());
  };

  const createRoom = () => {
    console.log("creating a room");

    // here the user will be the room creator
    socket.emit("create room", socket.id, user);
    setRoomCreated(true);
    dispatch(roomWasCreated());
  };

  const handleEndGame = () => {
    navigate("/lobby");
    socket.emit("end game", roomCode);
  };

  if (roomCreated) {
    return (
      <>
        <RoomsList type="VS" rooms={rooms} roomCode={roomCode} />
      </>
    );
  }

  if (roomJoined) {
    return (
      <RoomLobby
        room={roomRegion}
        roomCode={roomCode}
        handleGoingBack={handleEndGame}
        vsGameLocation={vsGameLocation}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-indigo-200">
      {/* <NavBar /> */}
      <div className="flex justify-center items-center flex-grow pb-12">
        <div className="flex bg-indigo-400 w-[48rem] container justify-between divide-x-2 divide-dashed divide-indigo-200 rounded-lg shadow-md h-[38rem]">
          <div className="p-4 basis-1/2 flex justify-center text-center h-full">
            <Button
              onClick={createRoom}
              className="self-center w-full bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
            >
              Create a room
            </Button>
          </div>
          <div className="p-4 basis-1/2 flex flex-col justify-center h-full ">
            <form onSubmit={joinRoom}>
              <Input
                size="lg"
                label="Room code"
                color="amber"
                placeholder="Room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="!text-amber-200"
              />
              <Button
                className="w-full mt-2 bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
                type="submit"
              >
                Join a room
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomControls;
