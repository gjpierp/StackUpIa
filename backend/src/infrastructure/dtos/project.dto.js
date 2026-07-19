/**
 * @file project.dto.js
 * @description Estructuras de Data Transfer Object (DTO) para la validación y transporte de información de proyectos.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Definición de estructuras DTO de entrada y serialización de salida.
 */

/**
 * Data Transfer Object para la creación de proyectos.
 */
class CreateProjectDTO {
    /**
     * @param {Object} rawData - Objeto con datos crudos de la petición HTTP.
     */
    constructor(rawData) {
        this.clientName = rawData.clientName;
        this.clientEmail = rawData.clientEmail;
        this.projectDescription = rawData.projectDescription;
        this.budgetType = rawData.budgetType || 'lite';
        this.timelineType = rawData.timelineType || 'standard';
    }

    /**
     * Valida sintácticamente las entradas procedentes de HTTP.
     * 
     * @returns {boolean} Retorna verdadero si es sintácticamente correcto.
     * @throws {Error} Si algún campo tiene formato o tipo inválido.
     */
    validate() {
        if (typeof this.clientName !== 'string' || this.clientName.trim().length < 3) {
            throw new Error('Formato o longitud del nombre del cliente inválidos.');
        }
        if (typeof this.clientEmail !== 'string' || !this.clientEmail.includes('@')) {
            throw new Error('Formato de correo electrónico inválido.');
        }
        if (typeof this.projectDescription !== 'string' || this.projectDescription.trim().length < 10) {
            throw new Error('La descripción debe detallarse en formato de texto y tener al menos 10 caracteres.');
        }
        const validBudgets = ['lite', 'mid', 'enterprise'];
        if (!validBudgets.includes(this.budgetType)) {
            throw new Error('Tipo de presupuesto no reconocido.');
        }
        const validTimelines = ['fast', 'standard', 'flexible'];
        if (!validTimelines.includes(this.timelineType)) {
            throw new Error('Tipo de plazo no reconocido.');
        }
        return true;
    }
}

/**
 * Data Transfer Object para estructurar la respuesta de salida HTTP del proyecto.
 */
class ProjectResponseDTO {
    /**
     * Convierte una entidad de dominio a un objeto plano listo para ser serializado como JSON.
     * 
     * @param {import('../../domain/project.entity')} project - Entidad de dominio.
     * @returns {Object} Objeto plano estructurado.
     */
    static fromDomain(project) {
        return {
            id: project.id,
            projectCode: project.projectCode,
            clientName: project.clientName,
            clientEmail: project.clientEmail,
            projectDescription: project.projectDescription,
            budgetType: project.budgetType,
            timelineType: project.timelineType,
            status: project.status,
            createdAt: project.createdAt.toISOString()
        };
    }
}

module.exports = {
    CreateProjectDTO,
    ProjectResponseDTO
};
