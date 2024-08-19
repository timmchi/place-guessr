import NavBar from "./Navigation/NavBar";
import Home from "./Home";

const Hero = ({ playSingleGame, playVsGame }) => {
  return (
    <div>
      <NavBar />
      <Home playSingleGame={playSingleGame} playVsGame={playVsGame} />
    </div>
  );
};

export default Hero;
