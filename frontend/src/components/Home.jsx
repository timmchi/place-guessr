import CtaButton from "./CtaButton";

const Home = ({ playSingleGame, playVsGame }) => {
  return (
    <div className="flex p-2 gap-4">
      <CtaButton handleClick={playVsGame} text="Play vs another player" />
      <CtaButton handleClick={playSingleGame} text="Play single game" />
    </div>
  );
};

export default Home;
