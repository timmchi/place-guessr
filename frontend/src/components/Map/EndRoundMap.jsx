import SingleRoundAnswer from "./SingleRoundAnswer";
import VsRoundAnswer from "./VsRoundAnswer";
import avatar from "../../../test/vavatar.jpg";
import avatar2 from "../../../test/avatar2.jpg";
import { Map } from "@vis.gl/react-google-maps";

const MAP_ID = import.meta.env.VITE_MAP_ID;

const EndRoundMap = ({
  gameType,
  guessLocation,
  answerLocation,
  player1Guess,
  player2Guess,
}) => {
  return (
    <div className="h-full w-full border-2 shadow-xl rounded border-amber-300">
      <Map
        defaultZoom={5}
        defaultCenter={answerLocation}
        disableDefaultUI={true}
        clickableIcons={false}
        reuseMaps={true}
        mapId={MAP_ID}
      >
        {gameType === "SINGLE" && (
          <SingleRoundAnswer
            guessLocation={guessLocation}
            answerLocation={answerLocation}
            playerAvatar={avatar}
          />
        )}
        {gameType === "VS" && (
          <VsRoundAnswer
            player1GuessLocation={player1Guess}
            player2GuessLocation={player2Guess}
            answerLocation={answerLocation}
            player1Avatar={avatar}
            player2Avatar={avatar2}
          />
        )}
      </Map>
    </div>
  );
};

export default EndRoundMap;
