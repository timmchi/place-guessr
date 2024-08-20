import NavBar from "./Navigation/NavBar";
import Home from "./Home";
import { Typography } from "@material-tailwind/react";

const Hero = ({ playSingleGame, playVsGame }) => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col"
      style={{
        backgroundImage: `url("https://www.newsanyway.com/wp-content/uploads/2020/06/Canva-Helsinki-cityscape-with-Helsinki-Cathedral-in-winter-Finland.jpg")`,
      }}
    >
      <NavBar />
      <div className="flex flex-grow flex-col items-center justify-center text-white">
        <Typography
          variant="h1"
          className="text-7xl backdrop-blur-[2px] mb-2 p-2 rounded-xl border-transparent"
        >
          Welcome to Place Guesser
        </Typography>
        <Typography
          variant="h3"
          className="backdrop-blur-[2px] p-2 rounded-xl border-transparent"
        >
          Appear in a random place and try your best to guess where you are
        </Typography>
        <Home playSingleGame={playSingleGame} playVsGame={playVsGame} />
      </div>
    </div>
  );
};

export default Hero;
