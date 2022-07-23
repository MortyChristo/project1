import backend.services.employee_servies
from backend.dao.reimbursement_dao import ReimbursementDao
from backend.dao.employee_dao import EmployeeDao
from backend.exception.reimbursement_error import ReimbursementError
from backend.services.employee_servies import EmployeeService

class ReimbursementService:
    def __init__(self):
        self.reimbursement_dao = ReimbursementDao()
        self.employee_dao = EmployeeDao()

    def add_reimbursement(self, reimbursement_obj):
        new_reimbursement_obj = self.reimbursement_dao.add_reimbursement(reimbursement_obj)
        if new_reimbursement_obj.amount <= 0:
            raise ReimbursementError("Amount needs to be positive")
        return new_reimbursement_obj.to_dict()

    def view_all_reimbursements(self):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_all_reimbursements()))

    def view_reimbursements_by_id(self, employee_id):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_reimbursements(employee_id)))

    def view_all_reimbursements_status(self):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_all_reimbursements_status()))

    def view_employee(self):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_employee()))

    def change_status_a(self, reimbursement_id):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.change_status_a(reimbursement_id)))

    def change_status_d(self, reimbursement_id):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.change_status_d(reimbursement_id)))