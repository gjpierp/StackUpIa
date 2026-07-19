/**
 * @file server.js
 * @description Servidor HTTP Express de Stackupia con soporte para servir archivos estáticos del frontend en producción (Heroku).
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.2.0  | 18-07-2026 | Gerardo Paiva G. | Unificación de capas: Express sirve el frontend estático y se adapta al puerto dinámico de Heroku.
 */

const express = require('express');
const path = require('path');
const PostgresProjectRepository = require('../adapters/postgres-project.repository');
const CreateProjectUseCase = require('../../application/usecases/create-project.usecase');
const GetProjectStatusUseCase = require('../../application/usecases/get-project-status.usecase');
const ProjectController = require('./project.controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* Middleware para CORS (solo relevante en desarrollo local si los puertos difieren) */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

/* Cableado de dependencias (Dependency Injection Container Manual) */
const projectRepository = new PostgresProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const getProjectStatusUseCase = new GetProjectStatusUseCase(projectRepository);

const projectController = new ProjectController({
    createProjectUseCase,
    getProjectStatusUseCase
});

/* Rutas de la API */
app.post('/api/projects', (req, res) => projectController.createProject(req, res));
app.get('/api/projects/:code', (req, res) => projectController.getProjectStatus(req, res));
app.get('/api/sre/metrics', (req, res) => projectController.getSreMetrics(req, res));

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        version: '1.2.0'
    });
});

/* Servir archivos estáticos del Frontend (index.html, styles.css, app.js) */
app.use(express.static(path.join(__dirname, '../../../../')));

/* Redirigir cualquier otra ruta de navegación al index.html del frontend (Single Page routing) */
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../../../../index.html'));
});

app.listen(PORT, async () => {
    try {
        /* Asegurar inicialización de la tabla en Postgres */
        await projectRepository.initializeTable();
        console.log(`[INFO] Conectado a PostgreSQL`);
    } catch (err) {
        console.error('[ERR] Error al inicializar tabla en base de datos:', err.message);
    }
    console.log(`[INFO] Servidor backend de Stackupia corriendo en puerto ${PORT}`);
});
