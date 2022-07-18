from backend.dao.reimbursement_dao import ReimbursementDao
from backend.dao.employee_dao import EmployeeDao


class ReimbursementService:
    def __init__(self):
        self.reimbursement_dao = ReimbursementDao()
        self.employee_dao = EmployeeDao()

    def add_reimbursement(self, reimbursement_obj):
        new_reimbursement_obj = self.reimbursement_dao.add_reimbursement(reimbursement_obj)
        return new_reimbursement_obj.to_dict()

    def view_reimbursement_by_id(self, employee_id):
        print("here3")
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_reimbursement_by_id(employee_id)))
