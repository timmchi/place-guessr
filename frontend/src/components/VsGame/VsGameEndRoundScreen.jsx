import Player from "../Player/Player";
import EndRoundMap from "../Map/EndRoundMap";
import { useSelector } from "react-redux";
import avatar from "../../../test/vavatar.jpg";
import avatar2 from "../../../test/avatar2.jpg";

const VsGameEndRoundScreen = ({ guessLocation, answerLocation }) => {
  const gameType = useSelector((state) => state.gameType);
  const { player1Guess, player2Guess } = useSelector(
    (state) => state.roundGuesses
  );
  const playerHealthPoints = useSelector((state) => state.hp);
  const playerRoundScores = useSelector((state) => state.roundScore);
  const roundDistances = useSelector((state) => state.roundDistance);
  const playersInRoom = useSelector((state) => state.roomPlayers);

  return (
    <div
      style={{ transition: "all 0.5s" }}
      className="h-[100%] w-[100%] absolute z-10 top-0 bg-indigo-300 bg-opacity-80 flex flex-col xl:flex-row items-center xl:items-start pb-36 xl:py-48"
    >
      <div className="pt-12 xl:pt-36 px-12 order-2 xl:order-1">
        <Player
          key="player1"
          playerVariant="p1"
          player={playersInRoom.player1.player1Object}
          healthPoints={playerHealthPoints.player1HP}
          score={playerRoundScores.player1RoundScore}
          distance={roundDistances.player1RoundDistance}
          gameType="vs"
          placeholderAvatarSrc={avatar}
        />
      </div>

      <div className="w-full h-full order-1 xl:order-2">
        <EndRoundMap
          gameType={gameType}
          guessLocation={guessLocation}
          answerLocation={answerLocation}
          player1Guess={player1Guess}
          player2Guess={player2Guess}
        />
      </div>

      <div className="pt-12 xl:pt-36 px-12 order-3 xl:order-3">
        <Player
          key="player2"
          playerVariant="p2"
          player={playersInRoom.player1.player2Object}
          healthPoints={playerHealthPoints.player2HP}
          score={playerRoundScores.player2RoundScore}
          distance={roundDistances.player2RoundDistance}
          gameType="vs"
          placeholderAvatarSrc={avatar2}
        />
      </div>
    </div>
  );
};

export default VsGameEndRoundScreen;
