import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/users";
import LoadingScreen from "../Screens/LoadingScreen";
import { useSelector } from "react-redux";
import AvatarSelectionList from "../AvatarSelectionList";
import UserStats from "./UserStats";
import UserMatchHistory from "./UserMatchHistory";
import UserEditingControls from "./UserEditingControls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../../hooks/useNotification";
import { createAvatarUrl } from "../../utils/playerUtils";
import { Button } from "@material-tailwind/react";
import { userUpdated } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/localStorageUtils";
import { userLoggedOut } from "../../reducers/userReducer";

const UserProfile = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { displayNotification } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingUsername, setEditingUsername] = useState(false);
  const [username, setUsername] = useState("");

  // maybe moving all of the user functionality read/update/delete to a useUser hook would be a good idea
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await usersService.getUser(userId),
    keepPreviousData: true,
  });

  // I suppose this can be changed to just a changeUserMutation and moved to a useUser hook
  // this should change to changeUserDataMutation
  const changeUserDataMutation = useMutation({
    mutationFn: usersService.updateUser,
    onSuccess: (data) => {
      console.log("successfully updated user", data);
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["games", userId] });
      displayNotification("success", "User successfully updated.");
    },
    onError: (error) => {
      console.log(error.message);
      displayNotification("error", "Something went wrong when updating user.");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: usersService.deleteUser,
    // i wonder what should I put there?
    onSuccess: () => console.log("user successfully deleted"),
    onError: (error) => {
      console.log(error.message);
      displayNotification("error", "Something went wrong when deleting user.");
    },
  });

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    console.log("user error", error.message);

    // Need to add user error screen
    return <div>User not found...</div>;
  }

  //   console.log("user data in frontend", data);
  const handleUsernameChange = () => {
    console.log(username);
    if (username !== data.username) {
      changeUserDataMutation.mutate(
        { id: userId, username },
        {
          onSuccess: () => {
            setEditingUsername(false);
          },
          onError: () => {
            setEditingUsername(false);
          },
        }
      );
      // need to change redux user state as well, but what about the avatar in the user redux state? How does that change?
      // DOESNT GET DISPATCHED - NEED TO FIX!
      dispatch(userUpdated({ username }));
    }
    // setEditingUsername(false);
  };

  const handleUsernameEditing = () => {
    setUsername(data.username);
    setEditingUsername(true);
  };

  const handleEditingCancel = () => {
    setEditingUsername(false);
    setUsername("");
  };

  const handleUserDeletion = (userId) => {
    if (confirm("Please confirm that you want to delete your profile")) {
      console.log("deleting...");

      // we want a delete mutation here, as well as a redirect to the main page, clearing redux state, clearing local storage and a notification that user was successfully deleted
      deleteUserMutation.mutate(userId);

      dispatch(userLoggedOut());
      removeUser();

      navigate("/");

      displayNotification("success", "User successfully deleted.");

      return;
    }

    console.log("profile deletion cancelled");
  };

  return (
    <div className="min-h-screen bg-indigo-200 flex px-4">
      <div className="text-white flex flex-col lg:flex-row gap-4 bg-indigo-400 mb-8 md:mb-20 mt-20 md:mt-32 w-full lg:mx-40 rounded-xl shadow-2xl">
        <div className="mx-5 md:mx-20 md:mb-20">
          <img
            src={createAvatarUrl(data.avatar)}
            className="h-80 w-80 object-cover object-center border-8 border-white mt-20 rounded-lg"
          />
          {user && user.id === data.id && (
            <AvatarSelectionList
              userId={data.id}
              changeAvatarMutation={changeUserDataMutation}
            />
          )}
          <UserEditingControls
            editingUsername={editingUsername}
            handleEditingCancel={handleEditingCancel}
            username={username}
            setUsername={setUsername}
            user={user}
            data={data}
            handleUsernameChange={handleUsernameChange}
            handleUsernameEditing={handleUsernameEditing}
          />
          {user && user.id === data.id && (
            <Button
              size="sm"
              className="text-center bg-red-500 bg-opacity-80 text-white w-full my-2"
              onClick={() => handleUserDeletion(userId)}
            >
              Delete User
            </Button>
          )}
          <UserStats wonGames={data.wonGames} gamesPlayed={data.totalGames} />
        </div>
        <UserMatchHistory userId={userId} />
      </div>
    </div>
  );
};

export default UserProfile;
