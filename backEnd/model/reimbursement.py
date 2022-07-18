class Reimbursements:
    def __init__(self, employee_id, status, type_of_reimbursement, description):
        self.employee_id = employee_id
        self.status = status
        self.type_of_reimbursement = type_of_reimbursement
        self.description = description

    def to_dict(self):
        return {
            "status": self.status,
            "type_of_reimbursement": self.type_of_reimbursement,
            "description": self.description
            }
