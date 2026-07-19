/**
 * @file create-project.usecase.test.js
 * @description Pruebas unitarias para el caso de uso CreateProjectUseCase utilizando mock de repositorio.
 * @author Gerardo Paiva G.
 * @date 19-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 19-07-2026 | Gerardo Paiva G. | Test unitarios con mocks para aislamiento e inyección de dependencias.
 */

const assert = require('assert');
const CreateProjectUseCase = require('../src/application/usecases/create-project.usecase');
const ProjectRepositoryPort = require('../src/application/ports/project-repository.port');

// Mock del puerto de repositorio Postgres
class MockProjectRepository extends ProjectRepositoryPort {
    constructor() {
        super();
        this.savedProjects = [];
    }

    async save(project) {
        const saved = { ...project, id: 'mock-uuid-1234' };
        this.savedProjects.push(saved);
        return saved;
    }
}

function run() {
    console.log('  [TEST] Ejecutando pruebas unitarias de CreateProjectUseCase...');

    // Test 1: Crear proyecto exitosamente genera código STK- y persiste
    {
        const repo = new MockProjectRepository();
        const useCase = new CreateProjectUseCase(repo);

        const projectData = {
            clientName: 'Empresa Demo',
            clientEmail: 'contacto@demos.com',
            projectDescription: 'Desarrollo de landing y backend interactivos.',
            budgetType: 'mid',
            timelineType: 'standard'
        };

        useCase.execute(projectData).then(project => {
            assert.strictEqual(project.id, 'mock-uuid-1234');
            assert.ok(project.projectCode.startsWith('STK-'));
            assert.strictEqual(project.clientName, 'Empresa Demo');
            assert.strictEqual(project.status, 'FASE_1');
            assert.strictEqual(repo.savedProjects.length, 1);
            console.log('    ✔ Ejecución y generación de código: PASADO');
        }).catch(err => {
            assert.fail('El caso de uso falló inesperadamente: ' + err.message);
        });
    }

    // Test 2: Validación de dominio fallida aborta la persistencia
    {
        const repo = new MockProjectRepository();
        const useCase = new CreateProjectUseCase(repo);

        const invalidData = {
            clientName: 'Ok', // Nombre muy corto
            clientEmail: 'contacto@demos.com',
            projectDescription: 'Demasiado corto.',
            budgetType: 'mid',
            timelineType: 'standard'
        };

        useCase.execute(invalidData).then(() => {
            assert.fail('El caso de uso debió arrojar un error de validación.');
        }).catch(err => {
            assert.strictEqual(repo.savedProjects.length, 0);
            assert.ok(err.message.includes('El nombre del cliente debe tener al menos 3 caracteres.'));
            console.log('    ✔ Aborto por validación inválida de dominio: PASADO');
        });
    }
}

module.exports = { run };
