
import express from 'express';
import productsRouter from '../../application/routes/productsRouter.js'; 

const createServer = () => {
    const app = express();

    app.use(express.json());

    app.use('/products', productsRouter); 
    
    app.get('/', (req, res) => {
        res.send('Servidor Express funcionando');
    });

    return app;
};

export default createServer;
