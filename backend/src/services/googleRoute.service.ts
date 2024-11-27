import { decode } from "@googlemaps/polyline-codec";
import axios from "axios";
import { RideDto } from "../@types/Ride";
import { RouteResponse } from "../@types/GoogleMapsApi";
import { ERROR_MESSAGES } from "../constants/error";
import { ErrorResponse } from "../@types/ErrorResponse";

const googleApiKey = process.env.GOOGLE_API_KEY;

const estimateRoute = async ({ origin, destination }: RideDto): Promise<RouteResponse | ErrorResponse> => {
  const requestBody = {
    origin: {
      address: origin,
    },
    destination: {
      address: destination,
    },
  };

  const headersConfig = {
    "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation",
    "X-Goog-Api-Key": googleApiKey,
  };

  try {
    const res = await axios.post("https://routes.googleapis.com/directions/v2:computeRoutes", requestBody, { headers: headersConfig });
    if (!res.data.routes || res.data.routes.length === 0) {
      return ERROR_MESSAGES.NO_RIDES_FOUND;
    }
    return res.data;
  } catch (error) {
    return ERROR_MESSAGES.GOOGLE_API_ERROR;
  }
};

const generateImage = async ({ origin, destination }: RideDto): Promise<{ imageData: string } | ErrorResponse> => {
  if (!origin || !destination) {
    return ERROR_MESSAGES.INVALID_DATA;
  }

  const polyline = await getRoutePolyline({ origin, destination });

  if (typeof polyline === "object" && "error_code" in polyline) {
    return polyline;
  }

  const coords = decode(polyline);
  const path = coords.map((point) => `${point[0]},${point[1]}`).join("|");

  const routeImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=${origin}&markers=${destination}&path=color:0x0000ff|weight:5|${path}&key=${googleApiKey}`;

  try {
    const response = await axios.get(routeImageUrl, { responseType: "arraybuffer" });
    const imageBase64 = Buffer.from(response.data, "binary").toString("base64");

    return {
      imageData: imageBase64,
    };
  } catch (error) {
    return ERROR_MESSAGES.IMAGE_GENERATION_ERROR;
  }
};

const getRoutePolyline = async ({ origin, destination }: RideDto): Promise<string | ErrorResponse> => {
  if (!origin || !destination) {
    return ERROR_MESSAGES.INVALID_DATA;
  }
  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleApiKey}`;

  try {
    const response = await axios.get(directionsUrl);
    if (response.data.routes && response.data.routes.length > 0) {
      const polyline = response.data.routes[0].overview_polyline.points;
      return polyline;
    } else {
      return ERROR_MESSAGES.ROUTE_NOT_FOUND;
    }
  } catch (error) {
    return ERROR_MESSAGES.GOOGLE_API_ERROR;
  }
};

export default { estimateRoute, generateImage, getRoutePolyline };
