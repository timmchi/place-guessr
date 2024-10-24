import gamesService from "../services/games";
import { useMutation, useQuery } from "@tanstack/react-query";
import useNotification from "./useNotification";

const useGames = (userId, singlePage, duelPage) => {
  const { displayNotification } = useNotification();

  // maybe notifications shouldnt be here
  const saveSingleGameMutation = useMutation({
    mutationFn: gamesService.saveSingleGame,
    onSuccess: (data) => {
      console.log("successfully saved the game", data);
      displayNotification("success", "Game saved successfully");
    },
    onError: (error) => {
      displayNotification(
        "error",
        "Something went wrong when saving the game",
        error.message
      );
    },
  });

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["games", userId, singlePage, duelPage],
    queryFn: async () =>
      await gamesService.getUsersGames(userId, singlePage, duelPage),
  });

  return { saveSingleGameMutation, isLoading, data, error, isError };
};

export default useGames;
