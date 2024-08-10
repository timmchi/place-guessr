import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const useStreetView = (initialValue) => {
  const map = useMap();
  const streetView = useMapsLibrary("streetView");

  const [streetViewService, setStreetViewService] = useState(initialValue);

  useEffect(() => {
    if (!map || !streetView) return;

    const newStreetViewService = new streetView.StreetViewService();

    setStreetViewService(newStreetViewService);
  }, [streetView, map]);

  return streetViewService;
};

export default useStreetView;
