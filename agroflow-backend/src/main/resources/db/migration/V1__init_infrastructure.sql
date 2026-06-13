CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,
full_name VARCHAR(150) NOT NULL,
email VARCHAR(150) NOT NULL,
password_hash VARCHAR(255) NOT NULL,
phone_number VARCHAR(20) NOT NULL,
system_role VARCHAR(20) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,

CONSTRAINT uk_users_email UNIQUE (email),
CONSTRAINT uk_users_phone UNIQUE (phone_number),
CONSTRAINT chk_users_role CHECK (system_role IN ('FARMER','LOGISTICS_PARTNER','ADMIN'))
);

CREATE INDEX idx_users_email_lookup ON users(email);
CREATE INDEX idx_users_role_filter ON users(system_role);