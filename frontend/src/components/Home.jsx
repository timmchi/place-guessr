import { Button } from "@material-tailwind/react";
import SocketConnectionManager from "./SocketConnectionManager";
import AnswerEmitterTest from "./AnswerEmitterTest";

const Home = ({ playSingleGame, playVsGame }) => {
  return (
    <div className="flex p-2 gap-4">
      <Button onClick={playVsGame} className="bg-green-500">
        Play vs another player
      </Button>
      <Button onClick={playSingleGame} className="bg-green-500">
        Play single game
      </Button>
      {/* <SocketConnectionManager />
      <AnswerEmitterTest /> */}
    </div>
  );
};

export default Home;
