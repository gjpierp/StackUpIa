/**
 * @file get-project-status.usecase.js
 * @description Caso de uso para recuperar el estado operacional de un proyecto por su código.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Implementación inicial de la búsqueda de estados de desarrollo.
 */

const { GetProjectStatusUseCasePort } = require('../ports/project-usecase.port');

/**
 * Caso de uso para consultar el estado del proyecto.
 * Llama al puerto de persistencia mediante el código único de seguimiento.
 */
class GetProjectStatusUseCase extends GetProjectStatusUseCasePort {
    /**
     * @param {import('../ports/project-repository.port')} projectRepository - Puerto de persistencia.
     */
    constructor(projectRepository) {
        super();
        this.projectRepository = projectRepository;
    }

    /**
     * Busca y retorna el estado de un proyecto.
     * 
     * @param {string} projectCode - Código del proyecto (Ej: STK-777).
     * @returns {Promise<import('../../domain/project.entity')|null>} El proyecto localizado o null.
     */
    async execute(projectCode) {
        return await this.projectRepository.findByCode(projectCode);
    }
}

module.exports = GetProjectStatusUseCase;
