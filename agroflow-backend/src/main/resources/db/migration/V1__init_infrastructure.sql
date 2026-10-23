
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,
public_id UUID NOT NULL DEFAULT uuid_generate_v4(),
full_name VARCHAR(150) NOT NULL,
email VARCHAR(150) NOT NULL,
password_hash VARCHAR(255) NOT NULL,
phone_number VARCHAR(20) NOT NULL,
system_role VARCHAR(20) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,

CONSTRAINT uk_users_public_id UNIQUE (public_id),
CONSTRAINT uk_users_email UNIQUE (email),
CONSTRAINT uk_users_phone UNIQUE (phone_number),
CONSTRAINT chk_users_role CHECK (system_role IN ('FARMER', 'TRANSPORTER', 'MARKETER', 'ADMIN'))
);

CREATE INDEX idx_users_email_lookup ON users(email);
CREATE INDEX idx_users_public_id_lookup ON users(public_id);
CREATE INDEX idx_users_role_filter ON users(system_role);