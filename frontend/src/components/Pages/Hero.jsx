import Home from "./Home";
import { Typography } from "@material-tailwind/react";
import panorama from "../../helsinki-panorama-test-min.png";

const Hero = ({ playSingleGame, playVsGame }) => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${panorama})`,
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="flex flex-grow flex-col items-center justify-center text-gray-200 p-6 rounded-3xl">
        <div className="backdrop-blur-xs rounded-3xl">
          <Typography
            variant="h1"
            className="text-5xl md:text-7xl mb-1 p-2 text-center drop-shadow-text"
          >
            Welcome to Place Guesser
          </Typography>
          <Typography
            variant="h3"
            className="p-2 text-xl md:text-2xl drop-shadow-text text-center"
          >
            Appear in a random place and try your best to guess where you are
          </Typography>
        </div>
        <Home playSingleGame={playSingleGame} playVsGame={playVsGame} />
      </div>
    </div>
  );
};

export default Hero;
