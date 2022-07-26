import backend.services.employee_servies
from backend.dao.reimbursement_dao import ReimbursementDao
from backend.dao.employee_dao import EmployeeDao
from backend.exception.reimbursement_error import ReimbursementError
from backend.services.employee_servies import EmployeeService


class ReimbursementService:
    def __init__(self):
        self.reimbursement_dao = ReimbursementDao()
        self.employee_dao = EmployeeDao()

    def add_reimbursement(self, reimbursement_obj, img):

        new_reimbursement_obj = self.reimbursement_dao.add_reimbursement(reimbursement_obj, img)

        if new_reimbursement_obj.amount <= 0:
            raise ReimbursementError("Amount needs to be positive")

        return new_reimbursement_obj.to_dict()

    def view_reimbursements_by_id(self, employee_id):
        re_obj = self.reimbursement_dao.view_reimbursements(employee_id)
        return re_obj

    def view_all_reimbursements_status(self):
        new_reimbursement_obj = self.reimbursement_dao.view_all_reimbursements_status()
        return new_reimbursement_obj
        # return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_all_reimbursements_status()))

    def view_employee(self):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.view_employee()))

    def change_status_d(self, rid, resolver, status):
        return list(map(lambda a: a.to_dict(), self.reimbursement_dao.change_status_d(rid, resolver, status)))