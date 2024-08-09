import Player from "./Player";

const RoundEndScreen = ({ players }) => {
  return (
    <div className="flex">
      <Player player={players[0]} />
      <Player player={players[1]} />
    </div>
  );
};

export default RoundEndScreen;
