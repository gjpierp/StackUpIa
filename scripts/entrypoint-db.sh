#!/bin/bash
# =====================================================================
# @file entrypoint-db.sh
# @description Docker Entrypoint con Backup Automático al Apagar (SIGTERM)
# @author Gerardo Paiva G.
# @date 18-07-2026
#
# HISTORIAL DE CAMBIOS:
# Version | Fecha      | Autor            | Descripción
# V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Implementación inicial de captura de señales de apagado y respaldo automatizado.
# =====================================================================

DB_USER=${POSTGRES_USER:-"postgres"}
DB_NAME=${POSTGRES_DB:-"postgres"}
BACKUP_DIR="/var/lib/postgresql/backups"

mkdir -p "$BACKUP_DIR"

backup_on_shutdown() {
    echo "⚠️  Capturada señal de apagado del contenedor. Ejecutando respaldo automático..."
    if command -v pg_dump &> /dev/null; then
        pg_dump -U "$DB_USER" -d "$DB_NAME" -F c -b -v -f "$BACKUP_DIR/auto_backup_$(date +%F_%H-%M-%S).dump"
        echo "✅ Respaldo de PostgreSQL completado con éxito."
    else
        echo "❌ No se encontró pg_dump instalado en el contenedor."
    fi
    if [ -n "$PID" ]; then
        kill -SIGTERM "$PID"
        wait "$PID"
    fi
    exit 0
}

trap 'backup_on_shutdown' SIGTERM SIGINT

echo "Starting Database Service..."
docker-entrypoint.sh postgres &
PID=$!
wait "$PID"
