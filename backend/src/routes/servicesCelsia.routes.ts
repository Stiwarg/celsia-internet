import { Router } from "express";
import ServiceController from '../controllers/servicie.controllers.js';
import ServiceControllerWithMiddleware from '../controllers/servicie.controllersWithMiddleware.js';
import { verifySchema } from "../middleware/validateSchema.js";
import { findServiceClientSchema, servicioSchema, updatedServicesSchema } from "../schemas/servicio.schemas.js";
import { findIdentificationClientSchema } from "../schemas/clients.schemas.js";
const routeService = Router();
// Versión SIN middleware de parte del Controller (SERVICE)
routeService.post('/servicesAdd',
    verifySchema( servicioSchema, "body"), 
    ServiceController.servicessAdd 
);
routeService.get('/contractedServices/:identificacion',
    verifySchema( findIdentificationClientSchema, "params" ),
    ServiceController.contractedServices 
);

routeService.put('/servicesUpdate/:identificacion',
    verifySchema( findIdentificationClientSchema, "params"),
    verifySchema( updatedServicesSchema, "body"), 
    ServiceController.servicesUpdate
);

routeService.delete('/servicesDelete/:identificacion', 
    verifySchema( findIdentificationClientSchema, "params"),
    verifySchema( findServiceClientSchema, "body" ),
    ServiceController.serviceDestroy
);



//-------------------------------------------------------------
// Versión CON middleware de parte del Controller (SERVICE)


routeService.post('/servicesAddWithMiddleware',
    verifySchema( servicioSchema, "body" ),
    ServiceControllerWithMiddleware.servicessAdd
);

routeService.get('/contractedServicesWithMiddleware/:identificacion', 
    verifySchema( findIdentificationClientSchema, "params"),
    ServiceControllerWithMiddleware.contractedServices
);

routeService.put('/servicesUpdateWithMiddleware/:identificacion',
    verifySchema( findIdentificationClientSchema, "params" ),
    verifySchema( updatedServicesSchema, "body" ),
    ServiceControllerWithMiddleware.servicesUpdate
);

routeService.delete('/servicesDeleteWithMiddleware/:identificacion',
    verifySchema( findIdentificationClientSchema, "params" ),
    verifySchema( findServiceClientSchema, "body" ),
    ServiceControllerWithMiddleware.serviceDestroy
);



export default routeService;