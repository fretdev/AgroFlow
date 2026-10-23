ALTER TABLE bookings ADD COLUMN expires_at TIMESTAMP(6);

UPDATE bookings SET expires_at = CURRENT_TIMESTAMP WHERE expires_at IS NULL;

ALTER TABLE bookings ALTER COLUMN  expires_at SET NOT NULL ;

CREATE INDEX idx_bookings_expires_at ON bookings(expires_at);