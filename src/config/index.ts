const dotenv = require('dotenv');
dotenv.config();

export default {
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },

    mysql: {
        port: parseInt(process.env.DB_PORT),
        host: (process.env.DB_HOST),
        user: (process.env.DB_USER),
        password: (process.env.DB_PASSWORD),
        databaseName: (process.env.DB_NAME),
    },

    port: (process.env.PORT),
}