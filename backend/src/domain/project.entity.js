/**
 * @file project.entity.js
 * @description Entidad de Dominio que representa una propuesta de proyecto tecnológico.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Definición de la clase pure de dominio y métodos de validación/creación.
 */

/**
 * Entidad de dominio inmutable para los proyectos.
 */
class Project {
    /**
     * @param {Object} params - Parámetros de inicialización de la entidad.
     * @param {string} [params.id] - Identificador único UUID del proyecto.
     * @param {string} params.projectCode - Código autogenerado para el tracker (Ej. STK-123).
     * @param {string} params.clientName - Nombre del cliente o empresa.
     * @param {string} params.clientEmail - Correo electrónico de contacto validado.
     * @param {string} params.projectDescription - Detalle del alcance del proyecto.
     * @param {string} params.budgetType - Rango de presupuesto ('lite', 'mid', 'enterprise').
     * @param {string} params.timelineType - Tiempos estimados ('fast', 'standard', 'flexible').
     * @param {string} params.status - Fase actual de desarrollo ('FASE_0', 'FASE_1', etc.).
     * @param {Date} params.createdAt - Timestamp de registro inicial.
     */
    constructor({
        id = null,
        projectCode,
        clientName,
        clientEmail,
        projectDescription,
        budgetType = 'lite',
        timelineType = 'standard',
        status = 'FASE_0',
        createdAt = new Date()
    }) {
        this.id = id;
        this.projectCode = projectCode;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.projectDescription = projectDescription;
        this.budgetType = budgetType;
        this.timelineType = timelineType;
        this.status = status;
        this.createdAt = createdAt;
    }

    /**
     * Valida que los datos obligatorios de negocio cumplan con las reglas mínimas.
     * 
     * @returns {boolean} Retorna verdadero si es válida.
     * @throws {Error} Si algún campo viola las reglas de negocio.
     */
    validate() {
        if (!this.clientName || this.clientName.trim().length < 3) {
            throw new Error('El nombre del cliente debe tener al menos 3 caracteres.');
        }
        if (!this.clientEmail || !this.clientEmail.includes('@')) {
            throw new Error('El correo electrónico suministrado es inválido.');
        }
        if (!this.projectDescription || this.projectDescription.trim().length < 10) {
            throw new Error('La descripción debe detallar al menos 10 caracteres del alcance.');
        }
        return true;
    }
}

module.exports = Project;
