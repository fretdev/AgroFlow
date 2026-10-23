CREATE TABLE bookings(
    id BIGINT GENERATED  BY DEFAULT AS IDENTITY PRIMARY KEY ,
    crop_listing_id BIGINT NOT NULL,
    buyer_id BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL ,
    updated_at TIMESTAMP(6) NOT NULL ,
    version BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT fk_crop_listing FOREIGN KEY (crop_listing_id) REFERENCES crop_listings(id)
);

CREATE INDEX idx_bookings_crop_listing_id ON bookings(crop_listing_id);
CREATE INDEX idx_bookings_buyer_id ON bookings(buyer_id);