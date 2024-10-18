import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import LoadingScreen from "../Screens/LoadingScreen";
import { Avatar, Button } from "@material-tailwind/react";
import { rooms } from "../../data/rooms";
import { useSelector } from "react-redux";
import AvatarSelectionList from "../AvatarSelectionList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../../hooks/useNotification";
import { createAvatarUrl } from "../../utils/playerUtils";

const UserProfile = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { displayNotification } = useNotification();

  // maybe moving all of the user functionality read/update/delete to a useUser hook would be a good idea
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await usersService.getUser(userId),
  });

  // I suppose this can be changed to just a changeUserMutation and moved to a useUser hook
  const changeAvatarMutation = useMutation({
    mutationFn: usersService.updateUser,
    onSuccess: (data) => {
      console.log("successfully updated avatar", data);
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      displayNotification("success", "Avatar successfully updated.");
    },
    onError: (error) => {
      displayNotification(
        "error",
        "Something went wrong when updating avatar.",
        error.message
      );
    },
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
      <div className="text-white flex gap-4 bg-indigo-400 mb-20 mt-32 w-full mx-40 rounded-xl shadow-2xl">
        <div className="mx-20 mb-20">
          <img
            // src={`${AWS_CONST}/${data.avatar}`}
            src={createAvatarUrl(data.avatar)}
            className="h-80 w-80 object-cover object-center border-8 border-white mt-20 rounded-lg"
          />
          {user && user.username === data.username && (
            <AvatarSelectionList
              userId={data.id}
              changeAvatarMutation={changeAvatarMutation}
            />
          )}
          <h1 className="text-4xl font-bold pt-4">{data.username}</h1>
          <div className="text-2xl flex gap-4">
            <div className="text-center font-bold">
              <h5>Wins</h5>
              <p className="text-2xl text-amber-300">
                {data.wonGames.length === 0 ? "None" : data.wonGames.length}
              </p>
            </div>
            <div className="text-center font-bold">
              <h5>Games Played</h5>
              <p className="text-2xl">{data.playedGames.length}</p>
            </div>
          </div>
        </div>
        <div className="my-[4.6rem] ">
          <h3 className="text-4xl font-bold text-center">Match History</h3>
          <div className="flex justify-between w-[62rem] text-center">
            {/* for both single and duels, last 5(10?) games with functionality to load more and scroll */}
            <div className="">
              <h4 className="text-3xl font-bold py-8">Single Games</h4>
              <div className="h-96 overflow-y-scroll no-scrollbar">
                {data.playedGames
                  .filter((game) => game.gameType === "SINGLE")
                  .map((game) => (
                    <div
                      key={game.id}
                      className="text-xl border-2 border-white p-2 w-[30rem] rounded-xl shadow-xl bg-indigo-300 flex gap-6 items-center mt-2"
                    >
                      <Avatar
                        variant="circular"
                        alt={`flag of ${
                          game.map !== "random" ? game.map : "the world"
                        }`}
                        className="border-2 border-indigo-700"
                        src={
                          rooms.find((room) => room.region === game.map).flag
                        }
                      />
                      <p className="font-bold">Score: {game.player1Score}</p>
                      <p>Rounds: 3</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-bold py-10">Duel Games</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
