import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import LoadingScreen from "../Screens/LoadingScreen";

const UserProfile = () => {
  const { userId } = useParams();

  // maybe moving all of the user functionality read/update/delete to a useUser hook would be a good idea
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await usersService.getUser(userId),
  });

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    console.log("user error", error.message);

    // Need to add user error screen
    return <div>User not found...</div>;
  }

  console.log("user data in frontend", data);

  return (
    <div className="pt-20 text-black">
      <h1>{data.username}</h1>
      <h3>Win/Loss</h3>
      {/* only visible to the profile owner?  */}
      <h3 className="text-4xl font-bold pt-12">Past games</h3>
      <h4 className="text-3xl font-bold py-8">Single Games</h4>
      {data.playedGames
        .filter((game) => game.gameType === "SINGLE")
        .map((game) => (
          <div key={game.id} className="text-xl border-2 border-black p-2 w-72">
            <p>Map type: {game.map}</p>
            <p>Map score: {game.player1Score}</p>
          </div>
        ))}
      <h4 className="text-3xl font-bold pt-12">Duel Games</h4>
    </div>
  );
};

export default UserProfile;
