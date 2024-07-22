INSERT INTO Roles (role_name)
VALUES ('Admin'),
       ('Manager'),
       ('CEO'),
       ('Director'),
       ('Developer');

-- Inserting multiple projects into the projects table
INSERT INTO projects (title, description, status)
VALUES
    ('Website Redesign', 'Redesigning company website to improve user experience and SEO', 'Planned'),
    ('Customer Database Migration', 'Migrating customer data to new CRM system for better management', 'Not Started'),
    ('Mobile App Development', 'Developing a mobile app for iOS and Android platforms', 'In Progress'),
    ('Marketing Campaign Launch', 'Launching a new marketing campaign for product promotion', 'Completed'),
    ('Infrastructure Upgrade', 'Upgrading server infrastructure to improve performance and security', 'Pending');
