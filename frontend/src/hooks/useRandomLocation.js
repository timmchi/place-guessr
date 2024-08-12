import { useQuery } from "@tanstack/react-query";
import mapsService from "../services/maps";

const useRandomLocation = (apiType, roundEnded) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["location", apiType, roundEnded],
    queryFn: async () => await mapsService.getRandomLocation(apiType),
    // enabled: false,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch };
};

export default useRandomLocation;
