# ROADMAP.md

Hoja de ruta del proyecto Stackupia, dividida en fases secuenciales que aseguran el cumplimiento del Stage-Gate Workflow.

## Estado del Proyecto: `[█████████░] 90%`
- **Fase Actual:** Fase 5: SRE y Resiliencia 🟡 (En Progreso)

---

## 📅 Desglose de Fases

### 🟢 Fase 0: Ideación y Mutación UI
- [x] Configuración del Entorno de Reglas (.agents / Brain Sync).
- [x] Creación de `CONTEXT.md`, `CONTEXT_CHANGELOG.md` y `ROADMAP.md`.
- [x] Definición del diseño visual y prototipo interactivo en HTML/CSS de la landing page y el dashboard de Stackupia.
- [x] Validación de la propuesta de interfaz.

### 🟢 Fase 1: Arquitectura y Estructura de Red
- [x] Inicialización del repositorio Git local y primer commit formal.
- [x] Configuración del backend en Node.js/Express con arquitectura hexagonal.
- [x] Configuración de la persistencia de base de datos PostgreSQL mediante Docker Compose con auto-backups.
- [x] Creación de scripts iniciales de migración de base de datos (Flyway).

### 🟢 Fase 2: API-First y Contratos
- [x] Diseño y validación del contrato OpenAPI 3.0 para la API del dashboard.
- [x] Definición de modelos, DTOs y puertos del backend.

### 🟢 Fase 3: Core Dev y Reflexión
- [x] Implementación de casos de uso y lógica de negocio mediante TDD.
- [x] Conexión del backend con la persistencia PostgreSQL.
- [x] Integración del Frontend moderno interactivo con la API del Backend.
- [x] Ejecución de la suite de pruebas unitarias y cobertura de código.

### 🟢 Fase 4: DevSecOps y Proxy Inverso
- [x] Configuración de Nginx como Reverse Proxy con seguridad SSL y cabeceras de cabina.
- [x] Configuración del pipeline de Integración Continua (CI/CD) simulado o automatizado.
- [x] Análisis de seguridad estática (SAST) y corrección de mojibakes/fugas.

### 🔴 Fase 5: SRE y Resiliencia
- [x] Configuración de Prometheus para el monitoreo de las señales doradas. (Nota: ya pre-cargado desde plantillas en infra Docker).
- [ ] Simulación de inyección de caos y fallas de red/BD para validar el comportamiento tolerante a fallos.
