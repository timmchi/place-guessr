import { Button } from "@material-tailwind/react";
import CtaButton from "./CtaButton";
import SocketConnectionManager from "./SocketConnectionManager";
import AnswerEmitterTest from "./AnswerEmitterTest";

const Home = ({ playSingleGame, playVsGame }) => {
  return (
    <div className="flex p-2 gap-4">
      <CtaButton handleClick={playVsGame} text="Play vs another player" />
      <CtaButton handleClick={playSingleGame} text="Play single game" />

      {/* <SocketConnectionManager />
      <AnswerEmitterTest /> */}
    </div>
  );
};

export default Home;
