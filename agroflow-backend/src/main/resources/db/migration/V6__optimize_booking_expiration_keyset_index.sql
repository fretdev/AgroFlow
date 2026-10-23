DROP INDEX IF EXISTS idx_bookings_expires_at;

CREATE INDEX  IF NOT EXISTS idx_bookings_expiration_keyset
    ON bookings (status, expires_at, id);