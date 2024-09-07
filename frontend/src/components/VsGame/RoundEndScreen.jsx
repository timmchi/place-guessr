import Player from "../Player/Player";
import { useSelector } from "react-redux";

const RoundEndScreen = ({ players }) => {
  const playerHealthPoints = useSelector((state) => state.hp);
  const playerRoundScores = useSelector((state) => state.roundScore);

  return (
    <div className="flex xl:gap-[66rem]">
      <Player
        key="player1"
        player={players[0]}
        healthPoints={playerHealthPoints[0].player1.hp}
        score={playerRoundScores[0].player1.score}
        gameType="vs"
      />
      <Player
        key="player2"
        player={players[1]}
        healthPoints={playerHealthPoints[1].player2.hp}
        score={playerRoundScores[1].player2.score}
        gameType="vs"
      />
    </div>
  );
};

export default RoundEndScreen;
