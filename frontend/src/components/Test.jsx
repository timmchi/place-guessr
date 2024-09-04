import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculatePlayerRoundScore } from "../reducers/roundScoreReducer";
import { causeHpRemoval } from "../reducers/hpReducer";
import { Button } from "@material-tailwind/react";

const scores = [0, 1000, 2000, 3000, 4000, 5000];

const Test = () => {
  const dispatch = useDispatch();
  const playerHealthPoints = useSelector((state) => state.hp);
  const playerRoundScores = useSelector((state) => state.roundScore);
  const [distanceValue, setDistanceValue] = useState(0);

  console.log(playerHealthPoints, playerRoundScores);

  const removeHpFromPlayer = (player) => {
    const scoreDifference = Math.abs(
      playerRoundScores[1].player2.score - playerRoundScores[0].player1.score
    );
    console.log("player: ", player, "score difference: ", scoreDifference);
    dispatch(causeHpRemoval(player, scoreDifference));
  };

  return (
    <div className="p-48 border-indigo-300 border-4 container mx-auto text-center my-48 bg-blue-gray-300 text-white">
      Distance value: {distanceValue}
      <div className="flex gap-4 justify-center pb-12">
        {scores.map((score) => (
          <Button size="md" key={score} onClick={() => setDistanceValue(score)}>
            {score}
          </Button>
        ))}
      </div>
      <div className="flex gap-4 justify-between">
        <div>
          <h2 className="text-3xl font-bold">Round scores</h2>
          <h4>Player 1 score: {playerRoundScores[0].player1.score}</h4>
          <h4>Player 2 score: {playerRoundScores[1].player2.score}</h4>
          <Button
            variant="outlined"
            onClick={() =>
              dispatch(calculatePlayerRoundScore("p1", distanceValue))
            }
          >
            Calculate score for player 1
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              dispatch(calculatePlayerRoundScore("p2", distanceValue))
            }
          >
            Calculate score for player 2
          </Button>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Player HP</h2>
          <h4>Player 1 hp: {playerHealthPoints[0].player1.hp}</h4>
          <h4>Player 2 hp: {playerHealthPoints[1].player2.hp}</h4>
          <Button variant="outlined" onClick={() => removeHpFromPlayer("p1")}>
            Remove HP from player 1
          </Button>
          <Button variant="outlined" onClick={() => removeHpFromPlayer("p2")}>
            Remove HP from player 2
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
