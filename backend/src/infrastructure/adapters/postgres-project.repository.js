/**
 * @file postgres-project.repository.js
 * @description Adaptador de persistencia PostgreSQL que implementa ProjectRepositoryPort con soporte para SSL y cadenas de conexión dinámicas (Heroku).
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.1.0  | 18-07-2026 | Gerardo Paiva G. | Soporte para cadena de conexión DATABASE_URL y forzado de SSL para compatibilidad con Heroku Postgres.
 */

const { Pool } = require('pg');
const ProjectRepositoryPort = require('../../application/ports/project-repository.port');
const Project = require('../../domain/project.entity');

/**
 * Adaptador de repositorio que conecta con PostgreSQL.
 */
class PostgresProjectRepository extends ProjectRepositoryPort {
    /**
     * Inicializa el pool de conexiones de pg leyendo cadenas de conexión de producción.
     */
    constructor() {
        super();
        const connectionString = process.env.DATABASE_URL;

        if (connectionString) {
            /* Configuración adaptada para Heroku Postgres (requiere SSL activo) */
            this.pool = new Pool({
                connectionString,
                ssl: {
                    rejectUnauthorized: false
                }
            });
        } else {
            /* Configuración local de desarrollo */
            this.pool = new Pool({
                user: process.env.DB_USER || 'admin',
                host: process.env.DB_HOST || 'localhost',
                database: process.env.DB_NAME || 'stackupia_db',
                password: process.env.DB_PASSWORD || 'admin_secure_pwd_123',
                port: parseInt(process.env.DB_PORT || '5434', 10)
            });
        }
    }

    /**
     * Inicializa la tabla de proyectos en caso de no existir.
     * 
     * @returns {Promise<void>}
     */
    async initializeTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_code VARCHAR(10) NOT NULL UNIQUE,
                client_name VARCHAR(100) NOT NULL,
                client_email VARCHAR(100) NOT NULL,
                project_description TEXT NOT NULL,
                budget_type VARCHAR(20) NOT NULL,
                timeline_type VARCHAR(20) NOT NULL,
                status VARCHAR(20) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await this.pool.query(query);
    }

    /**
     * Guarda el proyecto en PostgreSQL.
     * 
     * @param {Project} project - Proyecto a persistir.
     * @returns {Promise<Project>} El proyecto persistido.
     */
    async save(project) {
        await this.initializeTable();
        const query = `
            INSERT INTO projects (project_code, client_name, client_email, project_description, budget_type, timeline_type, status, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, project_code, client_name, client_email, project_description, budget_type, timeline_type, status, created_at;
        `;
        const values = [
            project.projectCode,
            project.clientName,
            project.clientEmail,
            project.projectDescription,
            project.budgetType,
            project.timelineType,
            project.status,
            project.createdAt
        ];

        const res = await this.pool.query(query, values);
        const row = res.rows[0];

        return new Project({
            id: row.id,
            projectCode: row.project_code,
            clientName: row.client_name,
            clientEmail: row.client_email,
            projectDescription: row.project_description,
            budgetType: row.budget_type,
            timelineType: row.timeline_type,
            status: row.status,
            createdAt: new Date(row.created_at)
        });
    }

    /**
     * Busca un proyecto por su código.
     * 
     * @param {string} projectCode - Código del proyecto.
     * @returns {Promise<Project|null>} El proyecto si existe o null.
     */
    async findByCode(projectCode) {
        await this.initializeTable();
        const query = `
            SELECT id, project_code, client_name, client_email, project_description, budget_type, timeline_type, status, created_at
            FROM projects
            WHERE project_code = $1;
        `;
        const res = await this.pool.query(query, [projectCode]);
        if (res.rows.length === 0) {
            return null;
        }

        const row = res.rows[0];
        return new Project({
            id: row.id,
            projectCode: row.project_code,
            clientName: row.client_name,
            clientEmail: row.client_email,
            projectDescription: row.project_description,
            budgetType: row.budget_type,
            timelineType: row.timeline_type,
            status: row.status,
            createdAt: new Date(row.created_at)
        });
    }
}

module.exports = PostgresProjectRepository;
