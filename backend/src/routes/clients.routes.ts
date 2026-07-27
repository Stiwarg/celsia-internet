import { Router } from "express";
import ClientController from "../controllers/client.controllers.js";
import ClientControllerWithMiddleware from '../controllers/client.controllersWithMiddleware.js';
import { verifySchema } from "../middleware/validateSchema.js";
import { clientsSchema, findIdentificationClientSchema, updatedClientSchema } from "../schemas/clients.schemas.js";

const routeClient = Router();

// Versión SIN middleware de parte del Controller (CLIENT)
routeClient.post('/clientAdd', 
    verifySchema( clientsSchema, "body"),
    ClientController.createClient 
);


routeClient.delete('/clientDelete/:identificacion', 
    verifySchema( findIdentificationClientSchema, "params" ),
    ClientController.deleteClient 
);

routeClient.get('/clientFind/:identificacion', 
    verifySchema( findIdentificationClientSchema, "params" ),
    ClientController.findClientByIdentification 
);

routeClient.put('/clientUpdate/:identificacion', 
    verifySchema( findIdentificationClientSchema, "params" ),verifySchema( updatedClientSchema, "body" ),
    ClientController.updateClient 
);

// -------------------------------------------------------
// Versión CON middleware de parte del Controller (CLIENT)
routeClient.post('/clientAddWithMiddleware', 
    verifySchema(clientsSchema, "body"), ClientControllerWithMiddleware.createClient 
);

routeClient.delete('/clientDeleteWithMiddleware/:identificacion', verifySchema( findIdentificationClientSchema, "params" ), ClientControllerWithMiddleware.deleteClient );

routeClient.get('/clientFindWithMiddleware/:identificacion',
    verifySchema( findIdentificationClientSchema, "params"), ClientControllerWithMiddleware.findClientByIdentification 
);

routeClient.put('/clientUpdateWithMiddleware/:identificacion',
    verifySchema( findIdentificationClientSchema, "params" ), verifySchema( updatedClientSchema, "body" ), ClientControllerWithMiddleware.updateClient 
);

export default routeClient;