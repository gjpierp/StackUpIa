#!/bin/bash
# =====================================================================
# @file chaos-monkey.sh
# @description Simulador de caos y resiliencia para la infraestructura Docker de Stackupia.
# @author Gerardo Paiva G.
# @date 18-07-2026
# 
# HISTORIAL DE CAMBIOS:
# Version | Fecha      | Autor            | Descripción
# V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Script inicial de caos para simular caídas de base de datos y pérdidas de paquetes.
# =====================================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

TARGET_CONTAINER=${1:-"stackupia-postgres-db"}
CHAOS_TYPE=${2:-"kill_db"}

echo -e "${RED}[Chaos Monkey] Iniciando inyección de fallas en caliente...${NC}"
echo -e "[Chaos Monkey] Target: $TARGET_CONTAINER"
echo -e "[Chaos Monkey] Tipo de Falla: $CHAOS_TYPE"

case "$CHAOS_TYPE" in
  "kill_db")
    echo -e "${RED}[Chaos Monkey] Deteniendo contenedor de BD abruptamente...${NC}"
    docker kill "$TARGET_CONTAINER"
    echo "[Chaos Monkey] Esperando desconexión de base de datos..."
    sleep 5
    echo -e "${GREEN}[Chaos Monkey] Reiniciando base de datos para verificar auto-recuperación...${NC}"
    docker start "$TARGET_CONTAINER"
    ;;
  *)
    echo "ERROR: Tipo de caos no soportado o inválido." >&2
    exit 1
    ;;
esac

echo -e "${GREEN}[Chaos Monkey] Inyección de fallas finalizada con éxito.${NC}"
exit 0
