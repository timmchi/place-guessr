import { useQuery } from "@tanstack/react-query";
import mapsService from "../services/maps";

const useRandomLocation = (apiType, region) => {
  console.log("region in hook", region);

  const { isLoading, data, error, isError, refetch } = useQuery({
    queryKey: ["location", apiType, region ? region : ""],
    queryFn: async () => await mapsService.getRandomLocation(apiType, region),
    // enabled: false,
    staleTime: Infinity,
    retry: false,
  });

  return { isLoading, data, refetch, error, isError };
};

export default useRandomLocation;
