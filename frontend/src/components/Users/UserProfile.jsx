import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import LoadingScreen from "../Screens/LoadingScreen";
import { useSelector } from "react-redux";
import AvatarSelectionList from "../AvatarSelectionList";
import UserStats from "./UserStats";
import UserMatchHistory from "./UserMatchHistory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../../hooks/useNotification";
import { createAvatarUrl } from "../../utils/playerUtils";

const UserProfile = () => {
  const { userId } = useParams();
  const [activeSinglePage, setActiveSinglePage] = useState(1);
  const [activeDuelPage, setActiveDuelPage] = useState(1);
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { displayNotification } = useNotification();

  // maybe moving all of the user functionality read/update/delete to a useUser hook would be a good idea
  //   const { isLoading, data, error, isError } = useQuery({
  //     queryKey: ["user", userId],
  //     queryFn: async () => await usersService.getUser(userId),
  //   });

  // I think a better way to do this would be to fetch games separately with a separate queryima
  // I will definitely change it to use a separate user games query, but for now I just want to get
  // it to work
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["user", userId, activeSinglePage, activeDuelPage],
    queryFn: async () =>
      await usersService.getUser(userId, activeSinglePage, activeDuelPage),
    keepPreviousData: true,
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
    <div className="min-h-screen bg-indigo-200 flex px-4">
      <div className="text-white flex flex-col lg:flex-row gap-4 bg-indigo-400 mb-8 md:mb-20 mt-20 md:mt-32 w-full lg:mx-40 rounded-xl shadow-2xl">
        <div className="mx-20 md:mb-20">
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
          <h1 className="text-4xl font-bold pt-4 text-center">
            {data.username}
          </h1>
          <UserStats wonGames={data.wonGames} gamesPlayed={data.totalGames} />
        </div>
        <UserMatchHistory
          singleGames={data.singleGames}
          duelGames={data.duelGames}
          singlePage={activeSinglePage}
          duelPage={activeDuelPage}
          setActiveSinglePage={setActiveSinglePage}
          setActiveDuelPage={setActiveDuelPage}
          totalSingleGames={data.totalSingleGames}
          totalDuelGames={data.totalDuelGames}
        />
      </div>
    </div>
  );
};

export default UserProfile;
