/**
 * @file project-usecase.port.js
 * @description Puertos de entrada (interfaces de casos de uso) para interactuar con la lógica de negocio.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Definición de puertos para casos de uso de creación y seguimiento de proyectos.
 */

/**
 * Puerto de entrada para el caso de uso de registro de proyectos.
 */
class CreateProjectUseCasePort {
    /**
     * Procesa la creación de un nuevo proyecto.
     * 
     * @param {Object} data - Datos para el registro.
     * @param {string} data.clientName - Nombre del prospecto.
     * @param {string} data.clientEmail - Email corporativo.
     * @param {string} data.projectDescription - Descripción de necesidades.
     * @param {string} data.budgetType - Rango de presupuesto.
     * @param {string} data.timelineType - Tiempo deseado.
     * @returns {Promise<import('../../domain/project.entity')}>} Entidad del proyecto registrada.
     */
    async execute(data) {
        throw new Error('Método no implementado');
    }
}

/**
 * Puerto de entrada para el caso de uso de seguimiento de proyectos.
 */
class GetProjectStatusUseCasePort {
    /**
     * Procesa la consulta del estado de un proyecto.
     * 
     * @param {string} projectCode - Código del proyecto.
     * @returns {Promise<import('../../domain/project.entity')|null>} Entidad del proyecto o null.
     */
    async execute(projectCode) {
        throw new Error('Método no implementado');
    }
}

module.exports = {
    CreateProjectUseCasePort,
    GetProjectStatusUseCasePort
};
