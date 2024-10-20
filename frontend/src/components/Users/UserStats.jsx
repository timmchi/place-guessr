const UserStats = ({ wonGames, gamesPlayed }) => {
  return (
    <div className="text-2xl flex gap-4 justify-center">
      <div className="text-center font-bold">
        <h5 className="opacity-70">Wins</h5>
        <p className="text-2xl text-amber-300">
          {wonGames.length === 0 ? "None" : wonGames.length}
        </p>
      </div>
      <div className="text-center font-bold">
        <h5 className="opacity-70">Games</h5>
        <p className="text-2xl">{gamesPlayed.length}</p>
      </div>
    </div>
  );
};

export default UserStats;
