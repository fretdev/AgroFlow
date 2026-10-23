CREATE TABLE crop_listings(
    id BIGSERIAL PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL CHECK ( quantity >= 1),
    price_per_unit DECIMAL(19,2) NOT NULL CHECK ( price_per_unit > 0),
    location VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_sold BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,

    CONSTRAINT fk_farmer FOREIGN KEY (farmer_id) REFERENCES  users(id)
);
CREATE INDEX idx_crop_listings_farmer_id ON crop_listings(farmer_id);
CREATE INDEX idx_crop_listings_category ON crop_listings(category);