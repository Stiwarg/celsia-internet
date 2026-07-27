import Clientes from '../models/client.model.js';
import Servicios from '../models/servicio.model.js';

Clientes.hasMany( Servicios, { 
    foreignKey: 'identificacion', 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'servicios' 
});

Servicios.belongsTo( Clientes, { foreignKey: 'identificacion', as: 'clientes' });
