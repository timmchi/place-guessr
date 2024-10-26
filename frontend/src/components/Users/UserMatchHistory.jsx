import { useState } from "react";
import UserGamesList from "./UserGamesList";
import Pagination from "../SmallComponents/Pagination";
import useGames from "../../hooks/useGames";
import useNotification from "../../hooks/useNotification";
import UserMatchHistoryLoadingElement from "./UserMatchHistoryLoading";

// I think we can move the pagination state to this component, as well as get the single games and duel games data here through the hook, but we will need a user id from above, additionally, total single and total duel games we can also get from the hook

const UserMatchHistory = ({ userId }) => {
  const [activeSinglePage, setActiveSinglePage] = useState(1);
  const [activeDuelPage, setActiveDuelPage] = useState(1);
  const { displayNotification } = useNotification();

  const { data, isLoading, error, isError } = useGames(
    userId,
    activeSinglePage,
    activeDuelPage
  );

  if (isError) displayNotification("error", error.message);

  return (
    <div className="my-4 lg:my-[4.6rem] mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-center">
        Match History
      </h3>
      {isLoading && <UserMatchHistoryLoadingElement />}
      {!isLoading && (
        <>
          {data.totalSingleGames !== 0 && data.totalDuelGames !== 0 ? (
            <div className="flex flex-col 2xl:flex-row justify-between xl:w-[62rem] text-center">
              <div className="flex flex-col items-center">
                <UserGamesList type="SINGLE" games={data.singleGames} />
                {data.totalSingleGames !== 0 && (
                  <Pagination
                    pages={Math.ceil(data.totalSingleGames / 5)}
                    active={activeSinglePage}
                    setActive={setActiveSinglePage}
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <UserGamesList type="DUEL" games={data.duelGames} />
                {data.totalDuelGames !== 0 && (
                  <Pagination
                    pages={Math.ceil(data.totalDuelGames / 5)}
                    active={activeDuelPage}
                    setActive={setActiveDuelPage}
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-3xl pt-8 text-amber-200">
              This user hasn't played in any games yet
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default UserMatchHistory;
