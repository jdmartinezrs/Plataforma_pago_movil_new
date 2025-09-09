import express from 'express';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // 🔹 fuerza que busque en la raíz
console.log('DB_HOST:', process.env.DB_HOST);

import createServer from './infraestructure/server/server.js';
import sequelize from './infraestructure/database/connectionSQLServer.js';

const startApp = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');

        const server = createServer();
        server.listen({ port: process.env.EXPRESS_PORT, host: process.env.EXPRESS_HOST }, () => {
            console.log(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
        });

    } catch (err) {
        console.error('Error iniciando la app:', err);
    }
};

startApp();


