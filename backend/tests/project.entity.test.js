/**
 * @file project.entity.test.js
 * @description Pruebas unitarias para validar la entidad de Dominio Project.
 * @author Gerardo Paiva G.
 * @date 19-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 19-07-2026 | Gerardo Paiva G. | Test unitarios nativos de validación de negocio y constructor de la entidad.
 */

const assert = require('assert');
const Project = require('../src/domain/project.entity');

function run() {
    console.log('  [TEST] Ejecutando pruebas unitarias de Project Entity...');

    // Test 1: Construcción correcta con parámetros válidos
    {
        const project = new Project({
            projectCode: 'STK-999',
            clientName: 'Gerardo Paiva',
            clientEmail: 'gerardo@stackupia.com',
            projectDescription: 'Desarrollo de microservicio con Node.js y Postgres.'
        });

        assert.strictEqual(project.projectCode, 'STK-999');
        assert.strictEqual(project.clientName, 'Gerardo Paiva');
        assert.strictEqual(project.clientEmail, 'gerardo@stackupia.com');
        assert.strictEqual(project.status, 'FASE_0'); // Default value
        assert.ok(project.validate());
        console.log('    ✔ Construcción y validación de entidad correcta: PASADO');
    }

    // Test 2: Falla de validación por nombre de cliente corto
    {
        const project = new Project({
            projectCode: 'STK-999',
            clientName: 'GP',
            clientEmail: 'gerardo@stackupia.com',
            projectDescription: 'Desarrollo de microservicio con Node.js y Postgres.'
        });

        assert.throws(() => {
            project.validate();
        }, /El nombre del cliente debe tener al menos 3 caracteres\./);
        console.log('    ✔ Validación de nombre corto de cliente: PASADO');
    }

    // Test 3: Falla de validación por email sin arroba
    {
        const project = new Project({
            projectCode: 'STK-999',
            clientName: 'Gerardo Paiva',
            clientEmail: 'gerardo-stackupia.com',
            projectDescription: 'Desarrollo de microservicio con Node.js y Postgres.'
        });

        assert.throws(() => {
            project.validate();
        }, /El correo electrónico suministrado es inválido\./);
        console.log('    ✔ Validación de email inválido: PASADO');
    }

    // Test 4: Falla de validación por descripción muy corta
    {
        const project = new Project({
            projectCode: 'STK-999',
            clientName: 'Gerardo Paiva',
            clientEmail: 'gerardo@stackupia.com',
            projectDescription: 'Corto'
        });

        assert.throws(() => {
            project.validate();
        }, /La descripción debe detallar al menos 10 caracteres del alcance\./);
        console.log('    ✔ Validación de descripción insuficiente: PASADO');
    }
}

module.exports = { run };
