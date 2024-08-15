import { socket } from "../sockets/socket";
import { Button } from "@material-tailwind/react";

const SocketConnectionManager = () => {
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <div className="flex gap-4">
      <Button onClick={connect}>Connect</Button>
      <Button onClick={disconnect}>Disconnect</Button>
    </div>
  );
};

export default SocketConnectionManager;
