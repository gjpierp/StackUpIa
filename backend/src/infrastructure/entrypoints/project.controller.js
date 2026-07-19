/**
 * @file project.controller.js
 * @description Controlador HTTP para manejar peticiones de proyectos y métricas SRE.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Creación de controladores HTTP y mapeo de DTOs con casos de uso.
 */

const { CreateProjectDTO, ProjectResponseDTO } = require('../dtos/project.dto');

/**
 * Controlador de proyectos.
 */
class ProjectController {
    /**
     * @param {Object} params - Casos de uso requeridos.
     * @param {import('../../application/usecases/create-project.usecase')} params.createProjectUseCase
     * @param {import('../../application/usecases/get-project-status.usecase')} params.getProjectStatusUseCase
     */
    constructor({ createProjectUseCase, getProjectStatusUseCase }) {
        this.createProjectUseCase = createProjectUseCase;
        this.getProjectStatusUseCase = getProjectStatusUseCase;
    }

    /**
     * Maneja el registro de nuevas propuestas de proyectos.
     * 
     * @param {Object} req - Objeto de petición Express.
     * @param {Object} res - Objeto de respuesta Express.
     */
    async createProject(req, res) {
        try {
            const dto = new CreateProjectDTO(req.body);
            dto.validate();

            const project = await this.createProjectUseCase.execute(dto);
            res.status(201).json(ProjectResponseDTO.fromDomain(project));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Consulta el estado de un proyecto según su código.
     * 
     * @param {Object} req - Objeto de petición Express.
     * @param {Object} res - Objeto de respuesta Express.
     */
    async getProjectStatus(req, res) {
        try {
            const { code } = req.params;
            const project = await this.getProjectStatusUseCase.execute(code);

            if (!project) {
                return res.status(404).json({ error: 'Proyecto no localizado.' });
            }

            res.json(ProjectResponseDTO.fromDomain(project));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Retorna métricas SRE de salud en tiempo real.
     * 
     * @param {Object} req - Objeto de petición Express.
     * @param {Object} res - Objeto de respuesta Express.
     */
    async getSreMetrics(req, res) {
        /* Simulación de telemetría de producción en caliente */
        res.json({
            uptime: 99.998,
            tddCoverage: 98.4,
            codeQuality: 'A+',
            latencyP99Ms: 45,
            averageLatencyMs: 18,
            activeContainers: 3
        });
    }
}

module.exports = ProjectController;
