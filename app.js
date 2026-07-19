/**
 * @file app.js
 * @description Lógica interactiva para el portal de Stackupia. Controla el Stack Builder, SLA Live Monitor, Terminal Project Tracker y validaciones.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Implementación de simuladores dinámicos, constructor de arquitectura y terminal interactiva.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Stack Builder Controller
    // ----------------------------------------------------
    const platformSelect = document.getElementById('platform-type');
    const frontendSelect = document.getElementById('frontend-tech');
    const backendSelect = document.getElementById('backend-tech');
    const databaseSelect = document.getElementById('database-tech');
    const sslCheck = document.getElementById('feat-ssl');
    const backupCheck = document.getElementById('feat-backup');
    const monitorCheck = document.getElementById('feat-monitoring');

    const complexityVal = document.getElementById('metric-complexity');
    const timelineVal = document.getElementById('metric-timeline');
    const architectureText = document.getElementById('architecture-text');

    function updateStackMetrics() {
        const platform = platformSelect.value;
        const frontend = frontendSelect.value;
        const backend = backendSelect.value;
        const database = databaseSelect.value;

        let complexity = 'Baja';
        let timeline = '2-3 semanas';
        let architectureCode = '';

        // Calculate Complexity and Timeline based on inputs
        if (platform === 'api') {
            complexity = 'Alta';
            timeline = '5-6 semanas';
        } else if (platform === 'saas') {
            complexity = 'Media';
            timeline = '4-5 semanas';
        }

        if (database === 'mixed' || backend === 'nestjs') {
            complexity = 'Alta';
            if (timeline === '4-5 semanas') timeline = '5-6 semanas';
        }

        // Generate dynamic technical recommendation text
        architectureCode = `// --- ARQUITECTURA GENERAL SUGERIDA (STACKUPIA) ---\n`;
        architectureCode += `const Solution = {\n`;
        architectureCode += `  pattern: "Arquitectura Hexagonal (Clean)",\n`;
        architectureCode += `  gateway: "Nginx Reverse Proxy (TLS 1.3)",\n`;
        architectureCode += `  frontend: "${frontend === 'vanilla' ? 'HTML5/CSS3 Nativo' : frontend.toUpperCase()}",\n`;
        architectureCode += `  backend: "${backend === 'nodejs' ? 'Express / Node.js (TypeScript)' : backend.toUpperCase()}",\n`;
        architectureCode += `  persistence: "${database === 'postgresql' ? 'PostgreSQL (Dockerized)' : database === 'redis' ? 'Redis (Session Store)' : 'Hybrid PostgreSQL + Redis Cache'}",\n`;
        architectureCode += `  features: [\n`;
        if (sslCheck.checked) architectureCode += `    "Seguridad HTTPS & Cabeceras HSTS/CSP",\n`;
        if (backupCheck.checked) architectureCode += `    "Auto-Backup DB con traps SIGTERM",\n`;
        if (monitorCheck.checked) architectureCode += `    "Métricas Prometheus (Golden Signals)",\n`;
        architectureCode += `  ],\n`;
        architectureCode += `  status: "Listo para desarrollo TDD"\n`;
        architectureCode += `};`;

        complexityVal.textContent = complexity;
        timelineVal.textContent = timeline;
        architectureText.textContent = architectureCode;

        // Apply accent color depending on complexity
        if (complexity === 'Alta') {
            complexityVal.style.color = 'var(--color-error)';
        } else if (complexity === 'Media') {
            complexityVal.style.color = 'var(--color-accent)';
        } else {
            complexityVal.style.color = 'var(--color-success)';
        }
    }

    // Set up listeners for Builder
    [platformSelect, frontendSelect, backendSelect, databaseSelect, sslCheck, backupCheck, monitorCheck].forEach(element => {
        if (element) {
            element.addEventListener('change', updateStackMetrics);
        }
    });

    // Initial trigger
    updateStackMetrics();


    // ----------------------------------------------------
    // 2. SRE Live SLA Monitor (API Latency simulator)
    // ----------------------------------------------------
    const liveChart = document.getElementById('live-chart');
    const maxBars = 25;
    const latencies = Array.from({ length: maxBars }, () => Math.floor(Math.random() * 20) + 10);

    function renderChart() {
        if (!liveChart) return;
        liveChart.innerHTML = '';
        latencies.forEach(lat => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            // Scale bar height to visual container
            bar.style.height = `${Math.min(lat * 2, 110)}px`;
            bar.setAttribute('title', `${lat}ms`);
            liveChart.appendChild(bar);
        });
    }

    function simulateLatency() {
        // Drop oldest value, add new simulated latency between 8ms and 65ms
        latencies.shift();
        const spikeChance = Math.random() > 0.9; // 10% chance of high latency spike
        const newLatency = spikeChance ? Math.floor(Math.random() * 40) + 40 : Math.floor(Math.random() * 15) + 10;
        latencies.push(newLatency);
        renderChart();
    }

    // Initialize and run interval
    renderChart();
    setInterval(simulateLatency, 2500);


    // ----------------------------------------------------
    // 3. Client Project Tracker Terminal
    // ----------------------------------------------------
    const trackBtn = document.getElementById('btn-track-project');
    const projectInput = document.getElementById('project-code-input');
    const terminalBody = document.getElementById('terminal-body');

    if (trackBtn && projectInput && terminalBody) {
        trackBtn.addEventListener('click', () => {
            const projectCode = projectInput.value.trim().toUpperCase();
            
            terminalBody.innerHTML = `<p class="terminal-line text-accent">&gt; Resolviendo metadatos para el proyecto ${projectCode}...</p>`;
            
            setTimeout(() => {
                if (projectCode === 'STK-777') {
                    terminalBody.innerHTML = `
                        <p class="terminal-line text-accent">&gt; Iniciando conexión con Gateway local...</p>
                        <p class="terminal-line text-muted">[INFO] Conectado exitosamente al nodo: global-node-01</p>
                        <p class="terminal-line text-accent">&gt; Ejecutando suite de pruebas unitarias TDD...</p>
                        <p class="terminal-line text-success">[OK] 42 tests completados con éxito (100% de éxito)</p>
                        <p class="terminal-line text-success">[OK] Cobertura de código: 98.4%</p>
                        <p class="terminal-line text-accent">&gt; Verificando contenedores activos (Docker Compose)...</p>
                        <p class="terminal-line text-muted">[INFO] Container 'stackupia-postgres' - STATUS: HEALTHY</p>
                        <p class="terminal-line text-muted">[INFO] Container 'stackupia-nginx' - STATUS: ONLINE (Port 80/443)</p>
                        <p class="terminal-line text-success">&gt;&gt;&gt; ESTADO DEL PROYECTO: LISTO PARA PRODUCCIÓN (FASE 4 COMPLETADA)</p>
                    `;
                } else if (projectCode.startsWith('STK-')) {
                    terminalBody.innerHTML = `
                        <p class="terminal-line text-accent">&gt; Consultando base de datos corporativa...</p>
                        <p class="terminal-line text-muted">[INFO] Proyecto localizado: ${projectCode}</p>
                        <p class="terminal-line text-accent">&gt; Analizando estado del repositorio Git...</p>
                        <p class="terminal-line text-success">[OK] Rama activa: support/v1.x</p>
                        <p class="terminal-line text-muted">[INFO] Fase actual: Fase 3 (Desarrollo Core & Reflexión)</p>
                        <p class="terminal-line text-muted">[INFO] 2 dependencias vulnerables identificadas por Trivy (SAST)</p>
                        <p class="terminal-line text-error">[WARN] Lint: Encontradas advertencias en el linter de estilos.</p>
                        <p class="terminal-line text-accent">&gt;&gt;&gt; ESTADO DEL PROYECTO: EN DESARROLLO (FASE 3)</p>
                    `;
                } else {
                    terminalBody.innerHTML = `
                        <p class="terminal-line text-accent">&gt; Consultando base de datos corporativa...</p>
                        <p class="terminal-line text-error">[ERR] Proyecto ${projectCode} no registrado o inactivo.</p>
                        <p class="terminal-line text-muted">[INFO] Por favor, verifica el código suministrado o contáctanos directamente para validarlo.</p>
                    `;
                }
            }, 1000);
        });
    }


    // ----------------------------------------------------
    // 4. Project Form Submission & Solution Evaluator
    // ----------------------------------------------------
    const projectForm = document.getElementById('project-submission-form');
    const formFeedback = document.getElementById('form-feedback');

    if (projectForm && formFeedback) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const clientName = document.getElementById('client-name').value;
            const clientEmail = document.getElementById('client-email').value;

            // Simple visual loading
            formFeedback.style.display = 'block';
            formFeedback.className = 'form-feedback-message';
            formFeedback.textContent = 'Enviando requerimientos a la mesa de arquitectura de Stackupia...';

            setTimeout(() => {
                formFeedback.className = 'form-feedback-message success';
                formFeedback.innerHTML = `
                    <strong>¡Solicitud Recibida con Éxito!</strong><br>
                    Gracias ${clientName}. Hemos registrado tu solicitud bajo el correo <strong>${clientEmail}</strong>. 
                    Un Ingeniero de Soluciones evaluará tu propuesta en menos de 24 horas.
                `;
                projectForm.reset();
            }, 1500);
        });
    }
});
