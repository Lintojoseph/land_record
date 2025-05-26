
-- CREATE DATABASE IF NOT EXISTS land_records;

-- USE land_records;

-- CREATE TABLE IF NOT EXISTS land_parcels (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   parcel_id VARCHAR(50) UNIQUE NOT NULL,
--   plot_number VARCHAR(50) NOT NULL,
--   owner_name VARCHAR(100) NOT NULL,
--   contact_number VARCHAR(20),
--   location VARCHAR(255) NOT NULL,
--   area DECIMAL(10, 2) NOT NULL,
--   zoning VARCHAR(50),
--   purchase_date DATE,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Sample data
-- INSERT INTO land_parcels 
-- (parcel_id, plot_number, owner_name, contact_number, location, area, zoning, purchase_date) 
-- VALUES
-- ('LND12345', 'PLT678', 'rahul', '555-123-4567', 'sm street', 2500.00, 'Residential', '2015-06-15'),
-- ('LND23456', 'PLT901', 'sharath', '555-234-5678', '456, Somewhere', 5000.00, 'Commercial', '2018-03-22');
-- database/init.sql
CREATE DATABASE IF NOT EXISTS land_records;

USE land_records;

CREATE TABLE IF NOT EXISTS land_parcels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parcel_id VARCHAR(50) UNIQUE NOT NULL,
  plot_number VARCHAR(50) NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20),
  location VARCHAR(255) NOT NULL,
  area DECIMAL(10, 2) NOT NULL,
  zoning VARCHAR(50),
  purchase_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT IGNORE INTO land_parcels 
(parcel_id, plot_number, owner_name, contact_number, location, area, zoning, purchase_date) 
VALUES
('LND12345', 'PLT678', 'rahul', '555-123-4567', 'sm street', 2500.00, 'Residential', '2015-06-15'),
('LND23456', 'PLT901', 'sharath', '555-234-5678', '456 Somewhere', 5000.00, 'Commercial', '2018-03-22');

