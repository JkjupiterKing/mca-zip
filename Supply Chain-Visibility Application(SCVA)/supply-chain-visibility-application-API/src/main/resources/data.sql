-- Insert initial records into customerorders table
INSERT INTO customerorders (order_id, customer_name, product_name, status) VALUES 
    (1, 'John Doe', 'Smartphone', 'Shipped'),
    (2, 'Jane Smith', 'Laptop', 'Processing'),
    (3, 'Michael Brown', 'Tablet', 'Delivered'),
    (4, 'Emily Johnson', 'Smartwatch', 'Pending'),
    (5, 'Peter', 'Headphones', 'Shipped'),
    (6, 'Neymar', 'Bluetooth Speaker', 'Pending'),
    (7, 'Dwayne Johnson', 'Camera', 'Processing'),
    (8, 'Rayn Reynolds', 'Fitness Tracker', 'Delivered'),
    (9, 'Pearson', 'External Hard Drive', 'Pending'),
    (10, 'Will Smith', 'Gaming Console', 'Shipped'),
    (11, 'jaden Smith', 'Gaming mouse', 'Pending');

INSERT INTO purchaseorders (item, quantity, supplier, price) VALUES
    ('Laptop', 2, 'ABC Suppliers', 20000),
    ('Printer', 1, 'XYZ Suppliers', 10000),
    ('Monitor', 3, 'Tech Solutions', 15000),
    ('Keyboard', 5, 'E-Commerce Supply', 5000),
    ('Mouse', 10, 'Tech Hub', 2500),
    ('Desk', 1, 'Office Furnishings Inc.', 12000),
    ('Chair', 2, 'Comfort Seating', 8000),
    ('Projector', 1, 'Audio Visual Tech', 30000),
    ('Scanner', 3, 'Digitize IT', 7000),
    ('External Hard Drive', 4, 'Storage Solutions Ltd.', 4000),
    ('Office Software Suite', 1, 'Software Solutions Co.', 15000),
    ('Printer Ink Cartridges (Set)', 2, 'Print Supplies Depot', 3000);

INSERT INTO supplier (name, contact_person, email, phone, address)
VALUES
    ('Supplier A', 'John Doe', 'john.doe@example.com', '123-456-7890', '123 Supplier St, City, Country'),
    ('Supplier B', 'Jane Smith', 'jane.smith@example.com', '987-654-3210', '456 Supplier Ave, Town, Country'),
    ('Supplier C', 'Mike Johnson', 'mike.johnson@example.com', '555-123-4567', '789 Supplier Rd, Village, Country'),
    ('Supplier D', 'Sarah Brown', 'sarah.brown@example.com', '111-222-3333', '321 Supplier Blvd, Hamlet, Country'),
    ('Supplier E', 'David Lee', 'david.lee@example.com', '444-555-6666', '567 Supplier Ln, City, Country'),
    ('Supplier F', 'Emily White', 'emily.white@example.com', '777-888-9999', '987 Supplier Way, Town, Country'),
    ('Supplier G', 'Michael Smith', 'michael.smith@example.com', '222-333-4444', '654 Supplier Ave, City, Country'),
    ('Supplier H', 'Jessica Green', 'jessica.green@example.com', '999-888-7777', '789 Supplier St, Village, Country'),
    ('Supplier I', 'Kevin Davis', 'kevin.davis@example.com', '123-987-6543', '432 Supplier Rd, Hamlet, Country'),
    ('Supplier J', 'Rachel Wilson', 'rachel.wilson@example.com', '654-321-9876', '876 Supplier Blvd, Town, Country');

INSERT INTO stockkeepingunit (stock_name, description, price, stock_quantity, created_at, updated_at)
VALUES
    ('Nike Air Zoom Pegasus 39', 'Premium running shoes with advanced cushioning technology', 25.5, 100, '2024-07-09 10:00:00', '2024-07-09 10:00:00'),
    ('Apple MacBook Pro 2024', 'Latest model with upgraded CPU and enhanced display', 30.75, 150, '2024-07-09 10:30:00', '2024-07-09 10:30:00'),
    ('Samsung Galaxy S30 Ultra', 'Flagship smartphone with cutting-edge camera and 5G support', 15.0, 75, '2024-07-09 11:00:00', '2024-07-09 11:00:00'),
    ('Sony 65" OLED 4K TV', 'High-definition television with vibrant colors and smart features', 20.25, 200, '2024-07-09 11:30:00', '2024-07-09 11:30:00'),
    ('Dell XPS 17 2024', 'Powerful laptop for professionals with a sleek design', 18.5, 80, '2024-07-09 12:00:00', '2024-07-09 12:00:00'),
    ('Bose QuietComfort 45 Headphones', 'Premium noise-canceling headphones for immersive sound', 22.0, 120, '2024-07-09 12:30:00', '2024-07-09 12:30:00'),
    ('Canon EOS R5 Mirrorless Camera', 'Professional-grade camera with high-resolution sensor and 8K video recording', 27.75, 90, '2024-07-09 13:00:00', '2024-07-09 13:00:00'),
    ('Nintendo Switch Pro', 'Next-generation gaming console with enhanced performance and graphics', 35.5, 180, '2024-07-09 13:30:00', '2024-07-09 13:30:00'),
    ('Tesla Model Y 2024', 'Electric SUV with long-range capabilities and advanced autopilot features', 40.0, 250, '2024-07-09 14:00:00', '2024-07-09 14:00:00'),
    ('Fitbit Charge 6', 'Fitness tracker with heart rate monitoring and GPS functionality', 17.25, 150, '2024-07-09 14:30:00', '2024-07-09 14:30:00');

