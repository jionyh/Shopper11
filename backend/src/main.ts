import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rideController from "./controllers/ride.controller";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/ride/estimate", rideController.estimate);
app.patch("/ride/confirm", rideController.confirm);
app.get("/ride/route-image", rideController.generateRouteImage);
app.get("/ride/:customer_id", rideController.get);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
