import { Sequelize } from "sequelize";
import { configEnv } from "../config/env.js";

/*const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'celsia-internet',
    user: 'stiwar',
    password: '',
    host: 'localhost',
    port: 5432
});*/

const sequelize = new Sequelize( configEnv.db.database , configEnv.db.user, configEnv.db.password ,{
    dialect: 'postgres',
    host: configEnv.db.host,
    port: configEnv.db.dbPort,
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