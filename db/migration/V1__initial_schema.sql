-- =====================================================================
-- @file V1__initial_schema.sql
-- @description Esquema inicial de base de datos Flyway para el proyecto Stackupia.
-- @author Gerardo Paiva G.
-- @date 18-07-2026
-- 
-- HISTORIAL DE CAMBIOS:
-- Version | Fecha      | Autor            | Descripción
-- V1.0.0  | 18-07-2026 | Gerardo Paiva G. | Estructuras de tablas de usuarios, consentimientos y logs de auditoría forense.
-- =====================================================================

-- 1. Tabla de usuarios con campos PII enmascarados/cifrados a nivel de aplicación
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    encrypted_email TEXT NOT NULL,
    encrypted_phone TEXT,
    encrypted_address TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- 2. Tabla inmutable append-only de registro de consentimientos (User Consent Ledger)
CREATE TABLE user_consent_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    consent_type VARCHAR(50) NOT NULL,
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    cryptographic_seal VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_consent_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_consent_ledger_user ON user_consent_ledger(user_id);
CREATE INDEX idx_consent_ledger_seal ON user_consent_ledger(cryptographic_seal);

-- 3. Tabla append-only de Logs Forenses y Auditoría Transaccional (Chain of Custody)
CREATE TABLE transactional_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID,
    action_type VARCHAR(100) NOT NULL,
    target_table VARCHAR(50) NOT NULL,
    record_id UUID NOT NULL,
    justification TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    previous_log_hash VARCHAR(64),
    current_log_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_type ON transactional_audit_logs(action_type);
CREATE INDEX idx_audit_current_hash ON transactional_audit_logs(current_log_hash);
