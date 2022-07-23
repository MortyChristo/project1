import backend.dao.employee_dao
import backend.dao.reimbursement_dao as rd
from backend.exception.registration_error import RegistrationError
from backend.exception.login_error import LoginError
from backend.exception.reimbursement_error import ReimbursementError
import backend.model.employee as ee
import backend.services.reimbursement_services as er
import backend.services.employee_servies as es
import pytest



def test_login_positive(mocker):
    def mock_get_login_information(self, username, password):
        if(username == "ChristopSullivan" and password == "PassWord123!"):
            return (ee.Employee(100001, "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net"))
    mocker.patch('backend.dao.employee_dao.EmployeeDao.get_user_by_username_and_password', mock_get_login_information)

    employee_serv = es.EmployeeService()
    actual = employee_serv.login("ChristopSullivan", "PassWord123!")

    assert actual == {
            'email_address': 'email1@revature.net',
            'employee_id': 100001,
            'employee_password': 'PassWord123!',
            'employee_type': 0,
            'first_name': 'Chris',
            'last_name': 'Sullivan',
            'username': 'ChristopSullivan'
        }


def test_login_negative(mocker):
    employee_obj = ee.Employee(10000, "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")

    def mock_get_login(self, username, password):
        if (username == 'ChristopSullivan' and password == 'PassWord123!'):
            return employee_obj
        else:
            return None
    mocker.patch('backend.dao.employee_dao.EmployeeDao.get_user_by_username_and_password', mock_get_login)
    employee_serv = es.EmployeeService()

    with pytest.raises(LoginError) as excinfo:
        employee_serv.login("f", "r")

    assert str(excinfo.value) == "Invalid username and/or password"


# def test_add_id_under_6_neg(mocker):
#     employee_obj = ee.Employee(10000, "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#
#         if (len(employee_obj.employee_id) > 6):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == 'Employee ID must be 6 digits long'
#
#
# def test_add_id_letter_neg(mocker):
#     employee_obj = ee.Employee("10000a", "ChristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#
#         if (employee_obj.employee_id.numeric):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Username must only contain alphanumeric characters"
#
#
# def test_add_username_numbers_neg(mocker):
#     employee_obj = ee.Employee("100001", "1hristopSullivan", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#
#         if (employee_obj.username.isalnum()):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Username must only contain alphanumeric characters"
#
#
# def test_add_username_under_6_neg(mocker):
#     employee_obj = ee.Employee("100001", "Chris", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#
#         if (len(employee_obj.username) < 6):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Username must be between 6 and 20 characters in length inclusive"
#
#
# def test_add_username_over_20_neg(mocker):
#     employee_obj = ee.Employee("100001", "ChristopSullivanasdfn", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#
#         if (len(employee_obj.username) > 20):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Username must be between 6 and 20 characters in length inclusive"
#
#
# def test_add_blank_neg(mocker):
#     employee_obj = ee.Employee("100001", "", "PassWord123!", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#
#         if (len(employee_obj.username) != ""):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Username must be between 6 and 20 characters in length inclusive"
#
#
# def test_add_lower_pass_neg(mocker):
#     employee_obj = ee.Employee("100001", "ChristopSullivan", "PASSWORD123!", "Chris", "Sullivan", 0, "email1@revature.net")
#
#     def mock_add(self, employee_obj):
#         lower_alpha_count = 0
#         alphabetical_characters = "abcdefghijklmnopqrstuvwxyz"
#
#         for char in employee_obj.employee_password:
#             if char in alphabetical_characters:
#                 lower_alpha_count += 1
#         if (lower_alpha_count > 0):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Password must have at least 1 lowercase character"
#
#
#
# def test_upper_pass_neg(mocker):
#     employee_obj = ee.Employee("100001", "ChristopSullivan", "password123!", "Chris", "Sullivan", 0, "email1@revature.net")
#
#     def mock_add(self, employee_obj):
#         upper_alpha_count = 0
#         alphabetical_characters = "abcdefghijklmnopqrstuvwxyz"
#
#         for char in employee_obj.employee_password:
#             if char in alphabetical_characters.upper:
#                 upper_alpha_count += 1
#         if (upper_alpha_count > 0):
#             return True
#         else:
#             return False
#
#         mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#         employee_serv = es.EmployeeService()
#         with pytest.raises(RegistrationError) as excinfo:
#             employee_serv.add_employee(employee_obj)
#         assert str(excinfo.value) == "Password must have at least 1 uppercase character"


# def test_special_char_pass_neg(mocker):
#     employee_obj = ee.Employee("100001", "ChristopSullivan", "PassWord123", "Chris", "Sullivan", 0, "email1@revature.net")
#     def mock_add(self, employee_obj):
#         special_char_count = 0
#         special_characters = "!@#$%^&*"
#
#         for char in employee_obj.employee_password:
#             if char in special_characters.upper:
#                 special_char_count += 1
#
#         if (special_char_count > 0):
#             return True
#         else:
#             return False
#
#     mocker.patch('backend.dao.employee_dao.EmployeeDao.add_employee', mock_add)
#     employee_serv = es.EmployeeService()
#     # actual = employee_serv.add_employee(employee_obj)
#
#     with pytest.raises(RegistrationError) as excinfo:
#              employee_serv.add_employee(employee_obj)
#     assert str(traceback(excinfo)) == "Password must have at least 1 special (!@#$%^&*) character"
