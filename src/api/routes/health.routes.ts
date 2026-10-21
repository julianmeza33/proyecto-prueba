
import { Router } from 'express';
import { prisma } from '../../persistence/prisma-client.js';
const router = Router();

router.get('/', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({ 
            status: 'ok',
            message: 'La API está funcionando',
            database: 'Conexión exitosa a la base de datos'
        });
    }
    catch {
        res.status(503).json({
            status: 'error',
            message: 'La base de datos no está funcionando',
            database: 'Error en la conexión'
        });
    }
});

export default router;