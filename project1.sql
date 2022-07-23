DROP TABLE IF EXISTS reimbursements;
DROP TABLE IF EXISTS employees;



CREATE TABLE employees(
employee_id VARCHAR(10) UNIQUE NOT NULL, 
username VARCHAR(20) PRIMARY KEY,
employee_password VARCHAR(20) NOT NULL,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
employee_type INTEGER,
email_address VARCHAR(200) NOT NULL UNIQUE
)


CREATE TABLE reimbursements(
employee_id VARCHAR(10) NOT NULL,
amount FLOAT,
status VARCHAR,
type_of_reimbursement VARCHAR, 
description VARCHAR DEFAULT 'N/A',

reimbursement_ID SERIAL PRIMARY KEY,
CONSTRAINT fk_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id)

)


INSERT INTO employees(employee_id, first_name, last_name, employee_type, username, employee_password, email_address  )
VALUES
(100001, 'Chris', 'Sullivan', 0, 'ChristopSullivan', 'PassWord123!', 'email1@revature.net'),
(100002, 'Martin', 'Burton', 1, 'MartyMcFly', 'TheDoc123!', 'email2@revature.net');


INSERT INTO reimbursements(employee_id, type_of_reimbursement, description, status, amount)
VALUES 
(100001, 'd', 'The CLub', 'Pending', 15.50),
(100001, 'a','', 'Approved', 16.20),
(100002, 'a', '', 'Denied', 15.20),
(100002, 'c','', 'Approved',14.00);


SELECT employees.first_name, employees.last_name, employees.employee_id, employee_type_identifier.employee_type
FROM employees
LEFT JOIN employee_type_identifier ON employees.employee_type = employee_type_identifier.id
ORDER BY employees.employee_id;


SELECT * FROM employees

SELECT * FROM reimbursements 

SELECT * FROM employee_type_identifier

SELECT * FROM reimbursements
ORDER BY status DESC;

SELECT employee_id FROM employees


UPDATE reimbursements 
SET status = 'Pending' 
WHERE reimbursement_ID = 1 RETURNING *









