class Employee:
    def __init__(self, employee_id, username, employee_password, first_name, last_name, email_address):
        self.employee_id = employee_id
        self.username = username
        self.employee_password = employee_password
        self.first_name = first_name
        self.last_name = last_name
        self.employee_type = 0
        self.email_address = email_address

    def to_dict(self):
        return {
            "employee_id": self.employee_id,
            "username": self.username,
            "employee_password": self.employee_password,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email_address": self.email_address
        }
