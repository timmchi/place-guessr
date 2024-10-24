import SingleRoundAnswer from "./SingleRoundAnswer";
import VsRoundAnswer from "./VsRoundAnswer";
import { Map } from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";
import { createAvatarUrl } from "../../utils/playerUtils";

const MAP_ID = import.meta.env.VITE_MAP_ID;

// NEED TO CHANGE AVATARS HERE!!!!
const EndRoundMap = ({
  gameType,
  guessLocation,
  answerLocation,
  player1Guess,
  player2Guess,
}) => {
  const playersInRoom = useSelector((state) => state.roomPlayers);
  const user = useSelector((state) => state.user);
  const player1 = playersInRoom.player1?.player1Object;
  const player2 = playersInRoom.player2?.player2Object;

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
            playerAvatar={
              user && user.avatarName
                ? createAvatarUrl(user.avatarName)
                : createAvatarUrl()
            }
          />
        )}
        {gameType === "VS" && (
          <VsRoundAnswer
            player1GuessLocation={player1Guess}
            player2GuessLocation={player2Guess}
            answerLocation={answerLocation}
            player1Avatar={
              player1 && player1?.avatarName
                ? createAvatarUrl(player1.avatarName)
                : createAvatarUrl()
            }
            player2Avatar={
              player2 && player2?.avatarName
                ? createAvatarUrl(player2.avatarName)
                : createAvatarUrl()
            }
          />
        )}
      </Map>
    </div>
  );
};

export default EndRoundMap;
