import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { Avatar } from "@material-tailwind/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const VsRoundAnswer = ({
  player1GuessLocation,
  player2GuessLocation,
  answerLocation,
  player1Avatar,
  player2Avatar,
}) => {
  return (
    <>
      <AdvancedMarker position={player1GuessLocation} title="Player 1's guess">
        <Avatar
          src={player1Avatar}
          alt="Player 1's avatar"
          withBorder={true}
          size="sm"
        />
      </AdvancedMarker>
      <AdvancedMarker position={player2GuessLocation} title="Player 2's guess">
        <Avatar
          src={player2Avatar}
          alt="Player 2's avatar"
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

      <Polyline path={[player1GuessLocation, answerLocation]} />
      <Polyline path={[player2GuessLocation, answerLocation]} />
    </>
  );
};

export default VsRoundAnswer;
