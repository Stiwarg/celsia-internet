import { Sequelize } from "sequelize";

/*const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'celsia-internet',
    user: 'stiwar',
    password: '',
    host: 'localhost',
    port: 5432
});*/

const sequelize = new Sequelize('celsia_prueba_db', 'postgres', 'camacho123',{
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: (...msg) => console.log(msg)
})

export const connections = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Ya se realizo la conexión');
    } catch (error: any) {
        throw new Error( error.message )
    }
}

export default sequelize;