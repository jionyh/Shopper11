import { decode } from "@googlemaps/polyline-codec";
import axios from "axios";
import { RideDto } from "../@types/Ride";
import { RouteResponse } from "../@types/GoogleMapsApi";

const estimateRoute = async ({ origin, destination }: RideDto): Promise<RouteResponse> => {
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
    "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
  };

  const res = await axios.post("https://routes.googleapis.com/directions/v2:computeRoutes", requestBody, { headers: headersConfig });
  return res.data;
};

const generateImage = async ({ origin, destination }: RideDto) => {
  if (!origin || !destination) {
    throw new Error("Os campos origin e destination são obrigatórios.");
  }

  const googleApiKey = process.env.GOOGLE_API_KEY;
  const coords = decode(await getRoutePolyline({ origin, destination }));
  const path = coords.map((point) => `${point[0]},${point[1]}`).join("|");

  const routeImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=${origin}&markers=${destination}&path=color:0x0000ff|weight:5|${path}&key=${googleApiKey}`;

  try {
    const response = await axios.get(routeImageUrl, { responseType: "arraybuffer" });
    const imageBase64 = Buffer.from(response.data, "binary").toString("base64");

    return {
      imageData: imageBase64,
    };
  } catch (error) {
    throw new Error("Erro ao gerar a imagem do mapa.");
  }
};

const getRoutePolyline = async ({ origin, destination }: RideDto) => {
  const googleApiKey = process.env.GOOGLE_API_KEY;

  if (!origin || !destination) {
    throw new Error("Os campos origin e destination são obrigatórios.");
  }
  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleApiKey}`;

  try {
    const response = await axios.get(directionsUrl);
    if (response.data.routes && response.data.routes.length > 0) {
      const polyline = response.data.routes[0].overview_polyline.points;
      return polyline;
    } else {
      throw new Error("Nenhuma rota encontrada para os pontos fornecidos");
    }
  } catch (error) {
    throw new Error("Erro ao buscar a rota");
  }
};

export default { estimateRoute, generateImage, getRoutePolyline };
