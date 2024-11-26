import { Request, Response } from "express";
import rideService from "../services/ride.service";
import googleRouteService from "../services/googleRoute.service";

async function estimate(req: Request, res: Response) {
  try {
    const result = await rideService.estimate(req.body);

    if ("error_code" in result) {
      res.status(result.status).json({
        error_code: result.error_code,
        error_description: result.error_description,
      });
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
      res.status(result.status).json({
        error_code: result.error_code,
        error_description: result.error_description,
      });
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
      res.status(result.status).json({
        error_code: result.error_code,
        error_description: result.error_description,
      });
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
    const result = await googleRouteService.generateImage({ origin: origin as string, destination: destination as string });
    if ("error_code" in result) {
      res.status(result.status).json({
        error_code: result.error_code,
        error_description: result.error_description,
      });
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

export default { estimate, confirm, get, generateRouteImage };
