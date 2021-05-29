import mysql, {} from 'mysql';
import {createConnection, Connection} from "typeorm"
import config from '../config';

export default async (): Promise<Connection> => {
    // const connection = mysql.createConnection({
    //     host: config.mysql.host,
    //     port: config.mysql.port,
    //     user: config.mysql.user,
    //     password: config.mysql.password,
    //     database: config.mysql.databaseName,
    // }).connect();
    const connection = createConnection();
    
    return connection;
};