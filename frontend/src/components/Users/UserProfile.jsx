import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import LoadingScreen from "../Screens/LoadingScreen";
import { Avatar, Button } from "@material-tailwind/react";
import { rooms } from "../../data/rooms";
import { useSelector } from "react-redux";
import AvatarSelectionList from "../AvatarSelectionList";
import UserStats from "./UserStats";
import UserGamesList from "./UserGamesList";
import UserMatchHistory from "./UserMatchHistory";
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
          <UserStats wonGames={data.wonGames} gamesPlayed={data.playedGames} />
        </div>
        <UserMatchHistory games={data.playedGames} />
      </div>
    </div>
  );
};

export default UserProfile;
