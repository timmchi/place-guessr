import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import LoadingScreen from "../Screens/LoadingScreen";

const AWS_CONST =
  "https://placeguessr-avatar-bucket.s3.eu-north-1.amazonaws.com";

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
    <div className="h-screen bg-indigo-200 flex">
      <div className="text-white flex gap-4 bg-indigo-400 m-auto rounded-xl shadow-2xl">
        <div className="mx-20 mb-20">
          <img
            src={`${AWS_CONST}/${data.avatar}`}
            className="h-80 w-80 object-cover object-center border-8 border-white mt-20"
          />
          <h1 className="text-4xl font-bold">{data.username}</h1>
          <h5>Wins</h5>
          <h5>Losses</h5>
        </div>
        <div className="my-20 mr-20">
          <h3 className="text-4xl font-bold">Past games</h3>
          <h4 className="text-3xl font-bold py-8">Single Games</h4>
          {data.playedGames
            .filter((game) => game.gameType === "SINGLE")
            .map((game) => (
              <div
                key={game.id}
                className="text-xl border-2 border-black p-2 w-72"
              >
                <p>Map type: {game.map}</p>
                <p>Map score: {game.player1Score}</p>
              </div>
            ))}
          <h4 className="text-3xl font-bold pt-12">Duel Games</h4>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
