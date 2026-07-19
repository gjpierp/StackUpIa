/**
 * @file get-project-status.usecase.test.js
 * @description Pruebas unitarias para el caso de uso GetProjectStatusUseCase utilizando mock de repositorio.
 * @author Gerardo Paiva G.
 * @date 19-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 19-07-2026 | Gerardo Paiva G. | Test unitarios de consulta de estado por código de tracker.
 */

const assert = require('assert');
const GetProjectStatusUseCase = require('../src/application/usecases/get-project-status.usecase');
const ProjectRepositoryPort = require('../src/application/ports/project-repository.port');
const Project = require('../src/domain/project.entity');

// Mock del puerto de repositorio para búsqueda por código
class MockSearchProjectRepository extends ProjectRepositoryPort {
    constructor(stubProject = null) {
        super();
        this.stubProject = stubProject;
    }

    async findByCode(projectCode) {
        if (this.stubProject && this.stubProject.projectCode === projectCode) {
            return this.stubProject;
        }
        return null;
    }
}

function run() {
    console.log('  [TEST] Ejecutando pruebas unitarias de GetProjectStatusUseCase...');

    const sampleProject = new Project({
        id: 'uuid-existente-123',
        projectCode: 'STK-777',
        clientName: 'Cliente VIP',
        clientEmail: 'vip@stackupia.com',
        projectDescription: 'Desarrollo de gateway de microservicios robusto.',
        status: 'FASE_4'
    });

    // Test 1: Proyecto localizado exitosamente
    {
        const repo = new MockSearchProjectRepository(sampleProject);
        const useCase = new GetProjectStatusUseCase(repo);

        useCase.execute('STK-777').then(project => {
            assert.notStrictEqual(project, null);
            assert.strictEqual(project.projectCode, 'STK-777');
            assert.strictEqual(project.status, 'FASE_4');
            assert.strictEqual(project.clientName, 'Cliente VIP');
            console.log('    ✔ Consulta exitosa de proyecto existente: PASADO');
        }).catch(err => {
            assert.fail('El caso de uso de consulta falló inesperadamente: ' + err.message);
        });
    }

    // Test 2: Proyecto inexistente retorna null
    {
        const repo = new MockSearchProjectRepository(sampleProject);
        const useCase = new GetProjectStatusUseCase(repo);

        useCase.execute('STK-999').then(project => {
            assert.strictEqual(project, null);
            console.log('    ✔ Consulta de proyecto inexistente retorna null: PASADO');
        }).catch(err => {
            assert.fail('El caso de uso falló inesperadamente: ' + err.message);
        });
    }
}

module.exports = { run };
