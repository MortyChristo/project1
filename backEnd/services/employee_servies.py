from backend.dao.employee_dao import EmployeeDao
from backend.exception.login_error import LoginError
from backend.exception.registration import RegistrationError

class EmployeeService:
    def __init__(self):
        self.employee_dao = EmployeeDao()

    def login(self, username, password):
        user_obj = self.employee_dao.get_user_by_username_and_password(username, password)

        if user_obj is None:
            raise LoginError("Invalid username and/or password")

        return user_obj.to_dict()


    def add_employee(self, employee_obj):
        registration_error = RegistrationError()

        # Username validation
       ##
        added_user_obj = self.employee_dao.add_employee(employee_obj)

        return added_user_obj.to_dict()
