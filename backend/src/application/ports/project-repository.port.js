/**
 * @file project-repository.port.js
 * @description Puerto de salida (interfaz) para definir operaciones de persistencia de proyectos.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Definición de interfaz para el almacenamiento de datos bajo arquitectura hexagonal.
 */

/**
 * Puerto de persistencia para proyectos.
 * Actúa como interfaz abstracta a ser implementada por adaptadores de infraestructura (ej. PostgreSQL).
 */
class ProjectRepositoryPort {
    /**
     * Guarda una entidad de proyecto en la base de datos.
     * 
     * @param {import('../../domain/project.entity')} project - Entidad de dominio del proyecto a guardar.
     * @returns {Promise<import('../../domain/project.entity')}>} Retorna la entidad guardada con ID asignado.
     * @throws {Error} Si ocurre un fallo en el motor de persistencia.
     */
    async save(project) {
        throw new Error('Método no implementado');
    }

    /**
     * Recupera un proyecto utilizando su código de seguimiento único.
     * 
     * @param {string} projectCode - Código asignado (Ej: STK-777).
     * @returns {Promise<import('../../domain/project.entity')|null>} Entidad si existe, null en caso contrario.
     * @throws {Error} Si falla la consulta al motor.
     */
    async findByCode(projectCode) {
        throw new Error('Método no implementado');
    }
}

module.exports = ProjectRepositoryPort;
