import { useQuery } from "@tanstack/react-query";
import { client } from "./Client";
import { Coordinates } from "../types/Step1";

export const useRouteMap = (origin: Coordinates, destination: Coordinates) =>
  useQuery({
    queryKey: ["routeMap"],
    queryFn: () => client.get(`/route-image?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`),
    staleTime: 0,
  });
