class Employee_id:
    def __init__(self, employee_id):
        self.employee_id = employee_id

    def to_dict(self):
        return {
            "employee_id": self.employee_id
        }