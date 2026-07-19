# CONTEXT.md (System Dynamic Prompt)

## 🌟 North Star (Objetivo Core)
Construir la plataforma corporativa y portal de ingeniería de Stackupia (stackupia.com), una empresa de desarrollo de software freelance de alto nivel. La plataforma debe promocionar soluciones tecnológicas premium, permitir la recepción de proyectos, y ofrecer herramientas interactivas avanzadas (Constructor de Stacks, Monitor de SLAs, Portal de Seguimiento y Metodología de Ingeniería) para evaluar y cotizar soluciones técnicas de forma interactiva.

## 🛠️ Stack Tecnológico (Inmutable)
*   **Frontend:** Vanilla HTML5, Vanilla CSS3 (Avanzado/Premium con variables y animaciones), Javascript Moderno (ES6 Modules).
*   **Backend:** Node.js con Express para API REST de simulación de proyectos y estado de SLAs.
*   **Persistencia:** PostgreSQL (Dockerizado) gestionado con Flyway.
*   **Infraestructura:** Docker Compose, Nginx como Proxy Inverso.
*   **Seguridad:** TLS local, cabeceras HSTS/CSP, seguridad perimetral HTTP/2.

## 🛡️ Invariantes (Reglas Absolutas del Proyecto)
1. **Calidad Visual Premium:** Toda interfaz de usuario debe incorporar elementos interactivos, animaciones suaves de hover, diseño moderno (modo oscuro por defecto, glassmorphism) y ser 100% responsiva.
2. **Cero Dependencias Externas CSS:** Uso exclusivo de CSS Nativo y CSS Variables para el diseño estético de la aplicación.
3. **Documentación de Código:** Todos los archivos creados deben contar con la cabecera estándar con autoría a `@author Gerardo Paiva G.` y la tabla estructurada de historial de cambios.
4. **Higiene del Workspace:** Erradicación total de archivos basura, código comentado (código zombie) y console.logs/prints de depuración en la entrega final.
