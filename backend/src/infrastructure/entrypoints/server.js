/**
 * @file server.js
 * @description Punto de entrada principal y servidor Express del backend de Stackupia.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Inicialización del servidor Express bajo arquitectura hexagonal y rutas base.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Endpoint de estado de salud del backend.
 * Retorna estado operacional y versión del servicio.
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.listen(PORT, () => {
    /* Impresión estructurada del inicio del servidor */
    console.log(`[INFO] Servidor backend de Stackupia corriendo en puerto ${PORT}`);
});
