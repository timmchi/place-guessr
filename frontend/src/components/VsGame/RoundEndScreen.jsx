import Player from "../Player/Player";

const RoundEndScreen = ({
  players,
  player1hp,
  player2hp,
  removePlayer1hp,
  removePlayer2hp,
  resetPlayer1hp,
  resetPlayer2hp,
}) => {
  return (
    <div className="flex">
      <Player
        key="player1"
        player={players[0]}
        healthPoints={player1hp}
        removeHp={removePlayer1hp}
        resetHp={resetPlayer1hp}
        gameType="vs"
      />
      <Player
        key="player2"
        player={players[1]}
        healthPoints={player2hp}
        removeHp={removePlayer2hp}
        resetHp={resetPlayer2hp}
        gameType="vs"
      />
    </div>
  );
};

export default RoundEndScreen;