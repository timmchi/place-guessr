import NavBar from "./Navigation/NavBar";
import Home from "./Home";
import { Typography } from "@material-tailwind/react";
import panorama from "../helsinki-panorama-test-min.png";

const Hero = ({ playSingleGame, playVsGame }) => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${panorama})`,
      }}
    >
      {/* <NavBar /> */}
      <div className="flex flex-grow flex-col items-center justify-center text-gray-200">
        <Typography
          variant="h1"
          className="text-7xl backdrop-blur-xs mb-1 p-2 rounded-3xl border-transparent drop-shadow-text"
        >
          Welcome to Place Guesser
        </Typography>
        <Typography
          variant="h3"
          className="backdrop-blur-xs p-2 rounded-3xl border-transparent drop-shadow-text"
        >
          Appear in a random place and try your best to guess where you are
        </Typography>
        <Home playSingleGame={playSingleGame} playVsGame={playVsGame} />
      </div>
    </div>
  );
};

export default Hero;
