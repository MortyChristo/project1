DROP TABLE IF EXISTS reimbursements;
DROP TABLE IF EXISTS employees;



CREATE TABLE employees(
employee_id VARCHAR(6) UNIQUE NOT NULL, 
username VARCHAR(20) PRIMARY KEY,
employee_password VARCHAR(20) NOT NULL,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,

email_address VARCHAR(200) NOT NULL UNIQUE
)


CREATE TABLE employee_type_identifier(

CONSTRAINT fk_employees FOREIGN KEY (employee_type) REFERENCES employees(employee_type)
)



CREATE TABLE reimbursements(
employee_id VARCHAR(6) NOT NULL,
status VARCHAR DEFAULT 'PENDING',
type_of_reimbursement VARCHAR(1), 
description VARCHAR DEFAULT 'N/A',
reimbursement_ID SERIAL PRIMARY KEY,
CONSTRAINT fk_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id)

)


INSERT INTO employees(employee_id, first_name, last_name, employee_type, username, employee_password, email_address  )
VALUES
(100001, 'Chris', 'Sullivan', 0, 'christopsullivan', 'PassWord123!', 'email1@revature.net'),
(100002, 'Martin', 'Burton', 1, 'MartyBurt', 'PassWord123!', 'email2@revature.net');


INSERT INTO reimbursements(employee_id, type_of_reimbursement, description)
VALUES 
(000001, 'd', 'The CLub'),
(000001, 'a',''),
(000002, 'a', ''),
(000002, 'c','');

SELECT * FROM employees

SELECT * FROM reimbursements 



