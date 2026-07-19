/**
 * @file create-project.usecase.js
 * @description Caso de uso para gestionar el registro de nuevos proyectos freelance.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Implementación de lógica de generación de códigos únicos y llamadas a persistencia.
 */

const Project = require('../../domain/project.entity');
const { CreateProjectUseCasePort } = require('../ports/project-usecase.port');

/**
 * Implementación del caso de uso para crear proyectos.
 * Genera el código único e interactúa con el puerto del repositorio.
 */
class CreateProjectUseCase extends CreateProjectUseCasePort {
    /**
     * @param {import('../ports/project-repository.port')} projectRepository - Adaptador de persistencia.
     */
    constructor(projectRepository) {
        super();
        this.projectRepository = projectRepository;
    }

    /**
     * Registra un proyecto generando un código secuencial aleatorio.
     * 
     * @param {Object} data - Datos del proyecto.
     * @param {string} data.clientName - Nombre del cliente.
     * @param {string} data.clientEmail - Email corporativo.
     * @param {string} data.projectDescription - Descripción detallada.
     * @param {string} data.budgetType - Tipo de presupuesto ('lite', 'mid', 'enterprise').
     * @param {string} data.timelineType - Plazo deseado.
     * @returns {Promise<import('../../domain/project.entity')}>} Entidad guardada.
     */
    async execute(data) {
        /* Generación aleatoria simple de código de proyecto STK-XXX */
        const randomNumber = Math.floor(100 + Math.random() * 900);
        const projectCode = `STK-${randomNumber}`;

        const project = new Project({
            projectCode,
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            projectDescription: data.projectDescription,
            budgetType: data.budgetType,
            timelineType: data.timelineType,
            status: 'FASE_1'
        });

        /* Validación de reglas puras de dominio */
        project.validate();

        /* Guardado persistente a través del puerto de salida */
        return await this.projectRepository.save(project);
    }
}

module.exports = CreateProjectUseCase;
