import { Typography } from "@material-tailwind/react";

const About = () => {
  return (
    <div className="bg-indigo-200 h-screen py-20">
      <Typography variant="h2">This is the about section</Typography>
      <Typography variant="h3">How to play</Typography>
      <div>
        <Typography variant="h3">About the game</Typography>
        <p>You can read more about design decisions on my personal website</p>
      </div>
      <div>
        <Typography variant="h3">You can find me at</Typography>
        <a href="https://github.com/timmchi" target="_blank">
          Github
        </a>
        <a href="https://timmchi.github.io" target="_blank">
          Personal website
        </a>
      </div>
    </div>
  );
};

export default About;
