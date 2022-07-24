class Reimbursements:
    def __init__(self, employee_id, amount, status, type_of_reimbursement, description, reimbursement_id, nameFile, imageFile):
        self.employee_id = employee_id
        self.amount = amount
        self.status = status
        self.type_of_reimbursement = type_of_reimbursement
        self.description = description
        self.reimbursement_id = reimbursement_id
        self.nameFile = nameFile
        self.imageFile = imageFile

    def to_dict(self):
        return {
            "employee_id": self.employee_id,
            "amount": self.amount,
            "status": self.status,
            "type_of_reimbursement": self.type_of_reimbursement,
            "description": self.description,
            "reimbursement_id": self.reimbursement_id,
            "imageFile" : self.imageFile,
            "nameFile" : self.nameFile
            }
