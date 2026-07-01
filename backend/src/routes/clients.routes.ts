import { Router } from "express";
import ClientController from "../controllers/client.controllers.js";

const routeClient = Router();

routeClient.post('/clientAdd', ClientController.createClient );

export default routeClient;