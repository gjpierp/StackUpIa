/**
 * @file server.js
 * @description Servidor HTTP Express de Stackupia con cableado de dependencias bajo Arquitectura Hexagonal.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.1.0  | 18-07-2026 | Gerardo Paiva G. | Cableado completo de persistencia PostgreSQL, inyección de dependencias y rutas del controlador.
 */

const express = require('express');
const PostgresProjectRepository = require('../adapters/postgres-project.repository');
const CreateProjectUseCase = require('../../application/usecases/create-project.usecase');
const GetProjectStatusUseCase = require('../../application/usecases/get-project-status.usecase');
const ProjectController = require('./project.controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* Middleware básico para habilitar Cross-Origin Resource Sharing (CORS) */
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

/* Rutas de la API mapeadas según la especificación OpenAPI */
app.post('/api/projects', (req, res) => projectController.createProject(req, res));
app.get('/api/projects/:code', (req, res) => projectController.getProjectStatus(req, res));
app.get('/api/sre/metrics', (req, res) => projectController.getSreMetrics(req, res));

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        version: '1.1.0'
    });
});

app.listen(PORT, async () => {
    try {
        /* Asegurar inicialización de la tabla en Postgres */
        await projectRepository.initializeTable();
        console.log(`[INFO] Conectado a PostgreSQL en puerto ${process.env.DB_PORT || 5434}`);
    } catch (err) {
        console.error('[ERR] Error al inicializar tabla en base de datos:', err.message);
    }
    console.log(`[INFO] Servidor backend de Stackupia corriendo en puerto ${PORT}`);
});
