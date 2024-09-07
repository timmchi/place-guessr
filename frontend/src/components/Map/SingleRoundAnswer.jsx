import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { Avatar } from "@material-tailwind/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const SingleRoundAnswer = ({ guessLocation, answerLocation, playerAvatar }) => {
  return (
    <>
      <AdvancedMarker position={guessLocation} title="Your guess">
        <Avatar
          src={playerAvatar}
          alt="your guess location"
          withBorder={true}
          size="sm"
        />
      </AdvancedMarker>

      <AdvancedMarker position={answerLocation} title="Correct location">
        <IoCheckmarkCircleSharp
          style={{ padding: 0, margin: 0 }}
          className="text-green-400 h-[2.3rem] w-[2.3rem] rounded-full border-2 border-black bg-green-800"
        />
      </AdvancedMarker>

      <Polyline path={[guessLocation, answerLocation]} />
    </>
  );
};

export default SingleRoundAnswer;
