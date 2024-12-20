import { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomWasCreated, roomWasJoined } from "../../reducers/playerReducer";
import { codeSubmitted } from "../../reducers/roomCodeReducer";
import useNotification from "../../hooks/useNotification";
import RoomLobby from "./RoomLobby";
import RoomsList from "./RoomsList";

const RoomControls = ({ rooms, joiningUserRoomRegion, vsGameLocation }) => {
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomJoined, setRoomJoined] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomCode = useSelector((state) => state.roomCode);
  const { displayNotification } = useNotification();

  // changes between the user who creates the room and who joins the room.
  // If null (not logged in), will be guest
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const onRoomDoesntExist = (roomCode) => {
      displayNotification("error", `Room "${roomCode}" does not exist.`);
      setRoomJoined(false);
    };

    socket.on("room doesnt exist", onRoomDoesntExist);

    return () => {
      socket.off("room doesnt exist", onRoomDoesntExist);
    };
  }, []);

  // here is the problem with the white screen and room being undefined
  const roomRegion = rooms.find(
    (room) => room.region === joiningUserRoomRegion
  );

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

  // passing roomCode below here is ok cuz RoomLobby uses it
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

  const handleRoomCodeChange = (e) => {
    dispatch(codeSubmitted(e.target.value));
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-200">
      <div className="flex justify-center items-center flex-grow pb-12">
        <div className="flex bg-indigo-400 w-[48rem] container justify-between divide-x-2 divide-dashed divide-indigo-200 rounded-lg shadow-md h-[38rem] mx-2 md:mx-0">
          <div className="p-4 basis-1/2 flex justify-center text-center h-full">
            <Button
              onClick={createRoom}
              className="self-center w-full bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
            >
              Create a room
            </Button>
          </div>
          <div className="p-2 md:p-4 basis-1/2 flex flex-col justify-center h-full ">
            <form onSubmit={joinRoom}>
              <Input
                size="lg"
                label="Room code"
                color="amber"
                placeholder="Room code"
                value={roomCode}
                onChange={handleRoomCodeChange}
                className="!text-amber-200"
              />
              <Button
                className="w-full mt-2 bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
                type="submit"
                // ok for now, but a better validation is needed.
                disabled={roomCode.length !== 4}
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
