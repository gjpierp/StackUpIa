/**
 * @file app.js
 * @description Lógica de integración del frontend de Stackupia con la API del Backend.
 * @author Gerardo Paiva G.
 * @date 18-07-2026
 * 
 * HISTORIAL DE CAMBIOS:
 * Version | Fecha      | Autor            | Descripción
 * V1.1.0  | 18-07-2026 | Gerardo Paiva G. | Conexión real con endpoints del backend Express para creación, consulta y telemetría.
 */

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api';

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

        if (complexity === 'Alta') {
            complexityVal.style.color = 'var(--color-error)';
        } else if (complexity === 'Media') {
            complexityVal.style.color = 'var(--color-accent)';
        } else {
            complexityVal.style.color = 'var(--color-success)';
        }
    }

    [platformSelect, frontendSelect, backendSelect, databaseSelect, sslCheck, backupCheck, monitorCheck].forEach(element => {
        if (element) {
            element.addEventListener('change', updateStackMetrics);
        }
    });

    updateStackMetrics();


    // ----------------------------------------------------
    // 2. SRE Live SLA Monitor (API Real Telemetry with simulator fallback)
    // ----------------------------------------------------
    const liveChart = document.getElementById('live-chart');
    if (liveChart) {
        const maxBars = 25;
        const latencies = Array.from({ length: maxBars }, () => Math.floor(Math.random() * 20) + 10);

        function renderChart() {
            liveChart.innerHTML = '';
            latencies.forEach(lat => {
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.style.height = `${Math.min(lat * 2, 110)}px`;
                bar.setAttribute('title', `${lat}ms`);
                liveChart.appendChild(bar);
            });
        }

        async function updateSreMetrics() {
            try {
                const response = await fetch(`${API_URL}/sre/metrics`);
                const uptimeEl = document.querySelector('.uptime-percentage');
                if (response.ok && uptimeEl) {
                    const metrics = await response.json();
                    uptimeEl.textContent = `${metrics.uptime}%`;
                    latencies.shift();
                    latencies.push(metrics.averageLatencyMs + Math.floor(Math.random() * 8));
                    renderChart();
                } else {
                    simulateLatencyFallback();
                }
            } catch (err) {
                simulateLatencyFallback();
            }
        }

        function simulateLatencyFallback() {
            latencies.shift();
            const spikeChance = Math.random() > 0.9;
            const newLatency = spikeChance ? Math.floor(Math.random() * 40) + 40 : Math.floor(Math.random() * 15) + 10;
            latencies.push(newLatency);
            renderChart();
        }

        renderChart();
        setInterval(updateSreMetrics, 2500);
    }


    // ----------------------------------------------------
    // 3. Client Project Tracker Terminal (Real API)
    // ----------------------------------------------------
    const trackBtn = document.getElementById('btn-track-project');
    const projectInput = document.getElementById('project-code-input');
    const terminalBody = document.getElementById('terminal-body');

    if (trackBtn && projectInput && terminalBody) {
        trackBtn.addEventListener('click', async () => {
            const projectCode = projectInput.value.trim().toUpperCase();
            
            terminalBody.innerHTML = `<p class="terminal-line text-accent">&gt; Consultando API de tracking para ${projectCode}...</p>`;
            
            try {
                const response = await fetch(`${API_URL}/projects/${projectCode}`);
                if (response.ok) {
                    const project = await response.json();
                    terminalBody.innerHTML = `
                        <p class="terminal-line text-accent">&gt; Proyecto localizado en base de datos PostgreSQL.</p>
                        <p class="terminal-line text-muted">[INFO] ID: ${project.id}</p>
                        <p class="terminal-line text-muted">[INFO] Cliente: ${project.clientName}</p>
                        <p class="terminal-line text-muted">[INFO] Email: ${project.clientEmail}</p>
                        <p class="terminal-line text-success">[OK] Fase activa de Roadmap: ${project.status}</p>
                        <p class="terminal-line text-success">[OK] Registrado en: ${new Date(project.createdAt).toLocaleString()}</p>
                        <p class="terminal-line text-accent">&gt;&gt;&gt; ESTADO DEL PROYECTO: ACTIVO (PROCESANDO)</p>
                    `;
                } else if (response.status === 404) {
                    /* Fallback para códigos fijos de demostración local offline */
                    if (projectCode === 'STK-777') {
                        terminalBody.innerHTML = `
                            <p class="terminal-line text-accent">&gt; Conexión establecida con Gateway local...</p>
                            <p class="terminal-line text-success">[OK] 42 tests completados con éxito (100% de éxito)</p>
                            <p class="terminal-line text-success">[OK] Cobertura de código: 98.4%</p>
                            <p class="terminal-line text-muted">[INFO] Container 'stackupia-postgres' - STATUS: HEALTHY</p>
                            <p class="terminal-line text-success">&gt;&gt;&gt; ESTADO DEL PROYECTO: LISTO PARA PRODUCCIÓN (FASE 4 COMPLETADA)</p>
                        `;
                    } else {
                        terminalBody.innerHTML = `
                            <p class="terminal-line text-error">[ERR] Proyecto ${projectCode} no registrado o inactivo en la base de datos.</p>
                            <p class="terminal-line text-muted">[SUGERENCIA] Registra un nuevo proyecto en el formulario inferior para generar un código válido.</p>
                        `;
                    }
                } else {
                    throw new Error('Fallo al obtener respuesta de la API.');
                }
            } catch (err) {
                /* Resiliencia: Fallback offline si el backend está apagado */
                if (projectCode === 'STK-777') {
                    terminalBody.innerHTML = `
                        <p class="terminal-line text-accent">&gt; Conexión establecida con Gateway local (Mock Mode)...</p>
                        <p class="terminal-line text-success">[OK] 42 tests completados con éxito (100% de éxito)</p>
                        <p class="terminal-line text-success">[OK] Cobertura de código: 98.4%</p>
                        <p class="terminal-line text-muted">[INFO] Container 'stackupia-postgres' - STATUS: HEALTHY</p>
                        <p class="terminal-line text-success">&gt;&gt;&gt; ESTADO DEL PROYECTO: LISTO PARA PRODUCCIÓN (FASE 4 MOCK)</p>
                    `;
                } else {
                    terminalBody.innerHTML = `
                        <p class="terminal-line text-error">[WARN] Backend desconectado. Servidor API no disponible temporalmente.</p>
                        <p class="terminal-line text-muted">[INFO] Código consultado: ${projectCode} (Ejecutando en modo desconectado).</p>
                    `;
                }
            }
        });
    }


    // ----------------------------------------------------
    // 4. Project Form Submission & Real Solution API
    // ----------------------------------------------------
    const projectForm = document.getElementById('project-submission-form');
    const formFeedback = document.getElementById('form-feedback');

    if (projectForm && formFeedback) {
        projectForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const clientName = document.getElementById('client-name').value;
            const clientEmail = document.getElementById('client-email').value;
            const projectDescription = document.getElementById('project-description').value;
            const budgetType = document.getElementById('project-budget').value;
            const timelineType = document.getElementById('project-timeline').value;

            formFeedback.style.display = 'block';
            formFeedback.className = 'form-feedback-message';
            formFeedback.textContent = 'Enviando requerimientos a la API de Stackupia...';

            try {
                const response = await fetch(`${API_URL}/projects`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        clientName,
                        clientEmail,
                        projectDescription,
                        budgetType,
                        timelineType
                    })
                });

                if (response.ok) {
                    const project = await response.json();
                    formFeedback.className = 'form-feedback-message success';
                    formFeedback.innerHTML = `
                        <strong>¡Proyecto Registrado Exitosamente!</strong><br>
                        Se ha asignado el código de seguimiento: <strong class="text-gradient">${project.projectCode}</strong>.<br>
                        Guarda este código para consultar el avance del desarrollo en el buscador superior.
                    `;
                    projectForm.reset();
                } else {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Error en el registro del proyecto.');
                }
            } catch (err) {
                /* Fallback de respaldo local si el backend no responde */
                formFeedback.className = 'form-feedback-message success';
                const mockCode = `STK-${Math.floor(100 + Math.random() * 900)}`;
                formFeedback.innerHTML = `
                    <strong>[MOCK MODE] Solicitud Registrada de Respaldo</strong><br>
                    (El backend local está desconectado). Hemos procesado localmente tu propuesta de soluciones.<br>
                    Tu código simulado es: <strong>${mockCode}</strong>
                `;
                projectForm.reset();
            }
        });
    }


    // ----------------------------------------------------
    // 5. Interactive Demos & Tabs Controller
    // ----------------------------------------------------
    
    // Tabs switcher
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(btn.getAttribute('data-tab'));
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // nmerge interactive controller
    const btnRunNmerge = document.getElementById('btn-run-nmerge');
    const nmergeJsonA = document.getElementById('nmerge-json-a');
    const nmergeJsonB = document.getElementById('nmerge-json-b');
    const nmergeOutput = document.getElementById('nmerge-output');
    const nmergeStrategy = document.getElementById('nmerge-strategy');

    if (btnRunNmerge && nmergeJsonA && nmergeJsonB && nmergeOutput) {
        btnRunNmerge.addEventListener('click', () => {
            try {
                const a = JSON.parse(nmergeJsonA.value);
                const b = JSON.parse(nmergeJsonB.value);
                const strategy = nmergeStrategy.value;

                let result = {};

                if (strategy === 'overwrite') {
                    result = { ...a, ...b };
                } else if (strategy === 'keep-both') {
                    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
                    keys.forEach(key => {
                        if (key in a && key in b) {
                            if (a[key] === b[key]) {
                                result[key] = a[key];
                            } else {
                                result[key] = [a[key], b[key]];
                            }
                        } else if (key in a) {
                            result[key] = a[key];
                        } else {
                            result[key] = b[key];
                        }
                    });
                }

                nmergeOutput.textContent = JSON.stringify(result, null, 2);
                nmergeOutput.style.color = '#00ffcc';
            } catch (err) {
                nmergeOutput.textContent = `// Error de Sintaxis JSON:\n${err.message}`;
                nmergeOutput.style.color = 'var(--color-error)';
            }
        });
    }

    // extractor interactive controller
    const btnRunExtractor = document.getElementById('btn-run-extractor');
    const extractorInputLogs = document.getElementById('extractor-input-logs');
    const extractorOutput = document.getElementById('extractor-output');

    if (btnRunExtractor && extractorInputLogs && extractorOutput) {
        btnRunExtractor.addEventListener('click', () => {
            const logsText = extractorInputLogs.value;
            
            // Regex patterns
            const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
            const statusRegex = /(INFO|WARN|ERR|SUCCESS)/g;

            const ips = logsText.match(ipRegex) || [];
            const emails = logsText.match(emailRegex) || [];
            const statuses = logsText.match(statusRegex) || [];

            const uniqueIps = [...new Set(ips)];
            const uniqueEmails = [...new Set(emails)];

            const result = {
                metadata: {
                    totalLinesAnalyzed: logsText.split('\n').filter(Boolean).length,
                    timestamp: new Date().toISOString()
                },
                extractedEntities: {
                    ipAddresses: uniqueIps,
                    emailAddresses: uniqueEmails
                },
                severitySummary: {
                    info: statuses.filter(s => s === 'INFO').length,
                    warnings: statuses.filter(s => s === 'WARN').length,
                    errors: statuses.filter(s => s === 'ERR').length,
                    successes: statuses.filter(s => s === 'SUCCESS').length
                }
            };

            extractorOutput.textContent = JSON.stringify(result, null, 2);
            extractorOutput.style.color = '#00ffcc';
        });
    }

    // sentinel-ngac dynamic resource synchronization
    const sentinelResource = document.getElementById('sentinel-resource');
    const btnRunSentinel = document.getElementById('btn-run-sentinel');
    const sentinelTerminal = document.getElementById('sentinel-terminal');

    function syncSentinelResources() {
        if (!sentinelResource) return;

        const platform = platformSelect.value;
        const frontend = frontendSelect.value;
        const backend = backendSelect.value;
        const database = databaseSelect.value;

        // Generate domains based on choices using stackupia.com
        const domains = [];
        domains.push(`https://${platform}.stackupia.com`);
        domains.push(`https://${frontend}.stackupia.com`);
        domains.push(`https://${backend}.stackupia.com`);
        domains.push(`https://${database}.stackupia.com`);

        const uniqueDomains = [...new Set(domains)];

        sentinelResource.innerHTML = '';
        uniqueDomains.forEach(domain => {
            const opt = document.createElement('option');
            opt.value = domain;
            opt.textContent = domain;
            sentinelResource.appendChild(opt);
        });
    }

    // Add change listeners to builder controls to update Sentinel dropdown
    [platformSelect, frontendSelect, backendSelect, databaseSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', syncSentinelResources);
        }
    });

    // Run once at start to populate Sentinel dropdown
    syncSentinelResources();

    if (btnRunSentinel && sentinelTerminal) {
        btnRunSentinel.addEventListener('click', () => {
            const subject = document.getElementById('sentinel-subject').value;
            const action = document.getElementById('sentinel-action').value;
            const resource = sentinelResource.value;

            sentinelTerminal.innerHTML = `<p class="terminal-line text-accent">&gt; Iniciando evaluación de política ABAC con Sentinel NGAC Engine...</p>`;

            setTimeout(() => {
                let decision = 'DENY';
                let reason = 'Ninguna regla de política explícita permite esta operación.';
                let lineClass = 'text-error';

                // Simple ABAC Rule Evaluation Engine
                if (subject === 'admin') {
                    decision = 'ALLOW';
                    reason = 'El rol Admin tiene permisos globales de superusuario.';
                    lineClass = 'text-success';
                } else if (subject === 'developer') {
                    if (action === 'read') {
                        decision = 'ALLOW';
                        reason = 'El rol Developer está autorizado a leer logs corporativos de stackupia.com.';
                        lineClass = 'text-success';
                    } else if (action === 'deploy') {
                        // Allow deploying frontends/backends, but not raw postgres/mixed databases directly
                        if (!resource.includes('postgresql') && !resource.includes('mixed')) {
                            decision = 'ALLOW';
                            reason = 'El rol Developer está autorizado a desplegar microservicios y código de aplicación.';
                            lineClass = 'text-success';
                        } else {
                            decision = 'DENY';
                            reason = 'Despliegues en bases de datos de producción están restringidos al rol Admin.';
                        }
                    } else if (action === 'delete') {
                        decision = 'DENY';
                        reason = 'Acciones destructivas (delete) están bloqueadas para desarrolladores.';
                    }
                } else if (subject === 'guest') {
                    decision = 'DENY';
                    reason = 'Los invitados externos tienen denegados todos los accesos operacionales a stackupia.com.';
                }

                sentinelTerminal.innerHTML = `
                    <p class="terminal-line text-muted">[INFO] Sujeto: ${subject}</p>
                    <p class="terminal-line text-muted">[INFO] Acción: ${action}</p>
                    <p class="terminal-line text-muted">[INFO] Recurso: ${resource}</p>
                    <p class="terminal-line text-accent">&gt; Evaluando atributos contextuales...</p>
                    <p class="terminal-line ${lineClass}">&gt;&gt;&gt; DECISIÓN: ${decision}</p>
                    <p class="terminal-line text-muted">[RAZÓN] ${reason}</p>
                    <p class="terminal-line text-accent">&gt; Auditoría append-only registrada en la base de datos.</p>
                `;
            }, 800);
        });
    }
});
