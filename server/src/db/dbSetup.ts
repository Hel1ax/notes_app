import {Sequelize} from "sequelize-typescript";
import { User } from "./user";
import { Note } from "./note";


const dbName = process.env.DB_NAME! 
const dbUser = process.env.DB_USER! 
const dbPassword = process.env.DB_PASSWORD!
const dbHost = process.env.DB_HOST 
const dbPort = process.env.DB_PORT; 

export default new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'postgres',
    host: dbHost,
    port: parseInt(dbPort!),
    models: [User, Note]
});

