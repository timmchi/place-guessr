import { useQuery } from "@tanstack/react-query";
import mapsService from "../services/maps";

const useRandomLocation = (apiType, region) => {
  console.log("region in hook", region);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["location", apiType, region ? region : ""],
    queryFn: async () => await mapsService.getRandomLocation(apiType, region),
    // enabled: false,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch };
};

export default useRandomLocation;
