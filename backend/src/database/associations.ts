import Clientes from '../models/client.model.js';
import Servicios from '../models/servicio.model.js';

Clientes.belongsTo( Servicios, { foreignKey: 'clienteIdentificacion', as: 'servicios' });
Servicios.hasMany( Clientes, { foreignKey: 'clienteIdentificacion' as 'clientes' });
