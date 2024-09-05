import Player from "../Player/Player";
import { useSelector, useDispatch } from "react-redux";
import { calculateHpDamage } from "../../utils/scoreUtils";
import { causeHpRemoval } from "../../reducers/hpReducer";

const RoundEndScreen = ({ players }) => {
  const playerHealthPoints = useSelector((state) => state.hp);
  const playerRoundScores = useSelector((state) => state.roundScore);
  const dispatch = useDispatch();

  const removeHpFromPlayer = () => {
    const hpRemovalValue = calculateHpDamage(
      playerRoundScores[1].player2.score,
      playerRoundScores[0].player1.score
    );

    // there will be a difference between scores in 99.99% of cases, and even if there
    // isnt, the amount of hp being removed will be 0. So, no sense in trying to fix
    // for this edge case atm or maybe ever
    if (
      playerRoundScores[0].player1.score > playerRoundScores[1].player2.score
    ) {
      dispatch(causeHpRemoval("p2", hpRemovalValue));
    }

    if (
      playerRoundScores[0].player1.score < playerRoundScores[1].player2.score
    ) {
      dispatch(causeHpRemoval("p1", hpRemovalValue));
    }
  };

  return (
    <div className="flex">
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
