import CtaButton from "../SmallComponents/CtaButton";

const Home = ({ playSingleGame, playVsGame }) => {
  return (
    <div className="flex p-2 gap-4">
      <CtaButton handleClick={playVsGame} text="Play Duel mode" />
      <CtaButton handleClick={playSingleGame} text="Play Single mode" />
    </div>
  );
};

export default Home;
