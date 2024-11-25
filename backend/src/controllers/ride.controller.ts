import { Request, Response } from "express";
import { generateImage } from "../services/googleRoute.service";
import rideService from "../services/ride.service";

async function estimate(req: Request, res: Response) {
  try {
    const result = await rideService.estimate(req.body);

    if ("error_code" in result) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Erro interno no servidor",
    });
  }
}

async function confirm(req: Request, res: Response) {
  try {
    const result = await rideService.confirm(req.body);

    if ("error_code" in result) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Erro interno no servidor",
    });
  }
}

async function get(req: Request, res: Response) {
  const { customer_id } = req.params;
  const { driver_id } = req.query;
  try {
    const result = await rideService.list(customer_id, driver_id as string);

    if ("error_code" in result) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Erro interno no servidor",
    });
  }
}

async function generateRouteImage(req: Request, res: Response) {
  const { origin, destination } = req.query;
  try {
    const routeImage = await generateImage({ origin: origin as string, destination: destination as string });
    res.json({ image: routeImage.imageData });
  } catch (error) {
    res.status(500).json({
      error_code: "IMAGE_GENERATION_FAILED",
      error_description: `${error}`,
    });
  }
}

export default { estimate, confirm, get, generateRouteImage };
