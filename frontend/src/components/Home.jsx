import { Button } from "@material-tailwind/react";
import SocketConnectionManager from "./SocketConnectionManager";

const Home = ({ playSingleGame, playVsGame }) => {
  return (
    <div className="flex p-2 gap-4">
      <Button onClick={playVsGame}>Play vs another player</Button>
      <Button onClick={playSingleGame}>Play single game</Button>
      <SocketConnectionManager />
    </div>
  );
};

export default Home;
