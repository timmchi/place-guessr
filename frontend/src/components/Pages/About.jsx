import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const About = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const handleOpen = (value) => setOpenIndex(openIndex === value ? 0 : value);

  return (
    <div className="bg-indigo-200 h-screen py-20 text-white">
      <Typography variant="h2" className="text-center">
        This is the about section
      </Typography>
      <Accordion open={openIndex === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-indigo-500"
        >
          How to play
        </AccordionHeader>
        <AccordionBody>Choose a game mode, choose a map and play</AccordionBody>
      </Accordion>
      <Accordion open={openIndex === 2}>
        <AccordionHeader onClick={() => handleOpen(2)} className="text-white">
          About the game
        </AccordionHeader>
        <AccordionBody>
          You can read more about design decisions on my personal website
        </AccordionBody>
      </Accordion>
      <Accordion open={openIndex === 3}>
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="text-amber-400"
        >
          About the author
        </AccordionHeader>
        <AccordionBody>
          You can find me at
          <div className="flex gap-4">
            <a href="https://github.com/timmchi" target="_blank">
              Github
            </a>
            <a href="https://timmchi.github.io" target="_blank">
              Personal website
            </a>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default About;
