/**
 * @file run-tests.js
 * @description Ejecutor (Test Runner) nativo y ligero de la suite de pruebas unitarias TDD.
 * @author Gerardo Paiva G.
 * @date 19-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 19-07-2026 | Gerardo Paiva G. | Test runner unificado para la orquestación de asserts.
 */

const projectEntityTest = require('./project.entity.test');
const createProjectUseCaseTest = require('./create-project.usecase.test');
const getProjectStatusUseCaseTest = require('./get-project-status.usecase.test');

console.log('======================================================');
console.log('🚀 STACKUPIA CORE TDD - SUITE DE PRUEBAS UNITARIAS');
console.log('======================================================');

try {
    projectEntityTest.run();
    createProjectUseCaseTest.run();
    getProjectStatusUseCaseTest.run();

    // Pequeño retardo para asegurar la resolución de promesas asíncronas en los logs
    setTimeout(() => {
        console.log('======================================================');
        console.log('🟢 ¡TODOS LOS TESTS COMPLETADOS Y PASADOS EXITOSAMENTE! SUCCESS (100%)');
        console.log('======================================================');
        process.exit(0);
    }, 100);
    
} catch (error) {
    console.error('======================================================');
    console.error('🔴 SUITE DE PRUEBAS DETENIDA POR UN FILTRADO DE FALLO:');
    console.error(error.stack || error.message);
    console.error('======================================================');
    process.exit(1);
}
