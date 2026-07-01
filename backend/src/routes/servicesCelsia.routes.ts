import { Router } from "express";
import ServicioController from "../controllers/servicie.controllers.js";

const routeService = Router();

routeService.post('/servicesAdd', ServicioController.servicessAdd );
routeService.get('/contractedServicess/', ServicioController.contractedServices );

export default routeService;