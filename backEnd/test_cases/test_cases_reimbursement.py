import backend.dao.employee_dao
import backend.dao.reimbursement_dao
from backend.exception.registration_error import RegistrationError
from backend.exception.login_error import LoginError
from backend.exception.reimbursement_error import ReimbursementError
from backend.model.employee import Employee
import backend.services.reimbursement_services as er
import backend.services.employee_servies as es
from backend.model.reimbursement import Reimbursements
import pytest


def test_add_re_amount_negative(mocker):

    reimbursement_obj = Reimbursements(100001, -2, "pending", "a", "n/a", 1, None, None, None, None)
    def mock_add_reimbursement(self, re_obj, img):
        if (re_obj.amount <= 0):
            return reimbursement_obj
        else:
            return None

    mocker.patch('backend.dao.reimbursement_dao.ReimbursementDao.add_reimbursement', mock_add_reimbursement)
    employee_serv = er.ReimbursementService()

    with pytest.raises(ReimbursementError) as excinfo:
        employee_serv.add_reimbursement(reimbursement_obj, None)

    assert str(excinfo.value) == "Amount needs to be positive"


def test_add_re_positive(mocker):
    reimbursement_obj = Reimbursements(100001, 200, "pending", "a", "n/a", 1, None, None, None, None)
    def mock_add_reimbursement(self, re_obj, img):
        if re_obj.amount is not None:
            return reimbursement_obj
    mocker.patch('backend.dao.reimbursement_dao.ReimbursementDao.add_reimbursement', mock_add_reimbursement)
    re_service = er.ReimbursementService()
    actual = re_service.add_reimbursement(reimbursement_obj, None)
    assert actual == {
        'amount': 200,
        'description': 'n/a',
        'employee_id': 100001,
        'reimbursement_id': 1,
        'status': 'pending',
        'type_of_reimbursement': 'a',
        'createdTime': None,
        'image': None,
        'resolvedTime': None,
        'resolver': None,
    }


# def test_view_all_positive(mocker):
#     dict_re = []
#     def mock_view(self):
#         reimbursement_obj1 = Reimbursements(100001, 200, "pending", "a", "n/a", 1, None, None, None, None)
#         reimbursement_obj2 = Reimbursements(100001, 200, "pending", "a", "n/a", 1, None, None, None, None)
#         reimbursement_obj3 = Reimbursements(100002, 200, "pending", "a", "n/a", 1, None, None, None, None)
#         dict_re.append(reimbursement_obj1)
#         dict_re.append(reimbursement_obj2)
#         dict_re.append(reimbursement_obj3)
#         return dict_re
#     mocker.patch('backend.dao.reimbursement_dao.ReimbursementDao.view_all_reimbursements_status', mock_view)
#     re_service = er.ReimbursementService()
#     actual = re_service.view_all_reimbursements_status()
#     assert actual == [
#            <backend.model.reimbursement.Reimbursements object at 0x0000026E2FBBA670>,
#            <backend.model.reimbursement.Reimbursements object at 0x0000026E2FBBA6A0>,
#            <backend.model.reimbursement.Reimbursements object at 0x0000026E2FBBA6D0>]


# def test_view_by_id_positive(mocker):
#     dict_re = []
#     def mock_view(self, employee_id):
#         if (employee_id == 100001):
#             reimbursement_obj1 = Reimbursements(100001, 200, "pending", "a", "n/a", 1, None, None, None, None)
#             reimbursement_obj2 = Reimbursements(100001, 200, "pending", "a", "n/a", 1, None, None, None, None)
#             dict_re.append(reimbursement_obj1)
#             dict_re.append(reimbursement_obj2)
#         return dict_re
#     mocker.patch('backend.dao.reimbursement_dao.ReimbursementDao.view_reimbursements', mock_view)
#     re_service = er.ReimbursementService()
#     actual = re_service.view_reimbursements_by_id(100001)
#     assert actual == [{
#         'amount': 200,
#         'description': 'n/a',
#         'employee_id': 100001,
#         'reimbursement_id': 1,
#         'status': 'pending',
#         'type_of_reimbursement': 'a'
#     }, {
#         'amount': 200,
#         'description': 'n/a',
#         'employee_id': 100001,
#         'reimbursement_id': 1,
#         'status': 'pending',
#         'type_of_reimbursement': 'a'
#
#     }]



def test_view_employee(mocker):
    em1 = Employee(100001, "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
    em2 = Employee(100002, "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
    em3 = Employee(100003, "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
    em_list = []
    em_list.append(em1)
    em_list.append(em2)
    em_list.append(em3)
    def mock_view(self):
        return em_list
    mocker.patch('backend.dao.reimbursement_dao.ReimbursementDao.view_employee', mock_view)
    re_serv = er.ReimbursementService()
    actual = re_serv.view_employee()
    assert actual ==[
        {'email_address': 'email1@revature.net',
          'employee_id': 100001,
          'employee_password': 'PassWord123!',
          'employee_type': 0,
          'first_name': 'Chris',
          'last_name': 'Sullivan',
          'username': 'ChristopSullivan'},
         {'email_address': 'email1@revature.net',
          'employee_id': 100002,
          'employee_password': 'PassWord123!',
          'employee_type': 0,
          'first_name': 'Chris',
          'last_name': 'Sullivan',
          'username': 'ChristopSullivan'},
         {'email_address': 'email1@revature.net',
          'employee_id': 100003,
          'employee_password': 'PassWord123!',
          'employee_type': 0,
          'first_name': 'Chris',
          'last_name': 'Sullivan',
          'username': 'ChristopSullivan'}]




def test_change_d(mocker):
    reimbursement_obj1  = Reimbursements(100001, 200, "pending", "a", "n/a", 1, None, None, None, None)
    def mock_change(re_id):
        if re_id == 1:
            reimbursement_obj1.status = "Denied"
    return reimbursement_obj1

    mocker.patch('backend.dao.reimbursement_dao.ReimbursementDao.change_status_d', mock_change)
    re_serv = er.ReimbursementService()
    actual = re_serv.change_status_a(1)
    assert actual == None