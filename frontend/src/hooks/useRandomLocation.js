import { useQuery } from "@tanstack/react-query";
import mapsService from "../services/maps";

const useRandomLocation = (apiType) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["location", apiType],
    queryFn: async () => await mapsService.getRandomLocation(apiType),
    enabled: false,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch };
};

export default useRandomLocation;
