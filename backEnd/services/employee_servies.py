import re
import backend.exception.registration_error
from backend.dao.employee_dao import EmployeeDao
from backend.exception.login_error import LoginError
from backend.exception.registration_error import RegistrationError


class EmployeeService:
    def __init__(self):
        self.employee_dao = EmployeeDao()
        self.error_messages = []

    def get_messages(self):
        return self.error_messages

    def login(self, username, password):
        user_obj = self.employee_dao.get_user_by_username(username, password)
        if user_obj is None:
            raise LoginError("Invalid username and/or password")
        return user_obj.to_dict()

    def add_employee(self, employee_id, username, employee_password, first_name, last_name, type_of_employee, email_address):
        registration_error = backend.exception.registration_error.RegistrationError()
        self.error_messages = []

        if not (len(str(employee_id)) == 6):
            self.error_messages.append("Employee ID must be 6 digits long")
            registration_error.messages.append("Employee ID must be 6 digits long")
        if not str(employee_id).isnumeric():
            self.error_messages.append("Employee ID should only contain numbers")
            registration_error.messages.append("Employee ID should only contain numbers")
        if backend.dao.employee_dao.EmployeeDao.check_employee_by_employee_id(self, employee_id) is not None:
            self.error_messages.append("Employee ID already being used")
            registration_error.messages.append("Employee ID already in use")
        if not username.isalpha():
            registration_error.messages.append("Username must only contain alphabetic characters")
            self.error_messages.append("Username must only contain alphabetic characters")
        if len(username) < 6 or len(username) > 20:
            registration_error.messages.append("Username must be between 6 and 20 characters in length inclusive")
            self.error_messages.append("Username must be between 6 and 20 characters in length inclusive")
        # if self.employee_obj.get_user_by_username(employee_obj.username) is not None:
        #     registration_error.messages.append("Username is already taken")
        if username == '':
             registration_error.messages.append("Username must not be blank")
             self.error_messages.append("Username must not be blank")
        if backend.dao.employee_dao.EmployeeDao.check_employee_by_username(self, username) is not None:
            self.error_messages.append("Username already being used")
            registration_error.messages.append("Username already in use")

            # Password validation
        alphabetical_characters = "abcdefghijklmnopqrstuvwxyz"
        special_characters = "!@#$%^&*"
        numeric_characters = "0123456789"

        lower_alpha_count = 0
        upper_alpha_count = 0
        special_character_count = 0
        numeric_character_count = 0

        for char in employee_password:
            if char in alphabetical_characters:
                lower_alpha_count += 1

            if char in alphabetical_characters.upper():
                upper_alpha_count += 1

            if char in special_characters:
                special_character_count += 1

            if char in numeric_characters:
                numeric_character_count += 1

        if lower_alpha_count == 0:
            registration_error.messages.append("Password must have at least 1 lowercase character")
            self.error_messages.append("Password must have at least 1 lowercase character")
        if upper_alpha_count == 0:
            registration_error.messages.append("Password must have at least 1 uppercase character")
            self.error_messages.append("Password must have at least 1 uppercase character")
        if special_character_count == 0:
            registration_error.messages.append("Password must have at least 1 special (!@#$%^&*) character")
            self.error_messages.append("Password must have at least 1 special (!@#$%^&*) character")
        if numeric_character_count == 0:
            registration_error.messages.append("Password must have at least 1 numeric character")
            self.error_messages.append("Password must have at least 1 numeric character")
        if len(employee_password) < 6 or len(employee_password) > 20:
            registration_error.messages.append("Password must be between 6 and 20 characters in length inclusive")
            self.error_messages.append("Password must be between 6 and 20 characters in length inclusive")
        if len(employee_password) != lower_alpha_count + upper_alpha_count + special_character_count + numeric_character_count:
            registration_error.messages.append("Password must contain only alphanumeric and special characters")
            self.error_messages.append("Password must contain only alphanumeric and special characters")

        # First Name validation
        if not first_name.isalpha():
            registration_error.messages.append("First name must contain only alphabetical characters")
            self.error_messages.append("First name must contain only alphabetical characters")
        if len(first_name) < 2 or len(first_name) > 100:
            registration_error.messages.append("Length of first name must be between 2 and 100 characters inclusive")
            self.error_messages.append("Length of first name must be between 2 and 100 characters inclusive")

        # Last Name validation
        if not last_name.isalpha():
            registration_error.messages.append("Last name must contain only alphabetical characters")
            self.error_messages.append("Last name must contain only alphabetical characters")
        if len(last_name) < 2 or len(last_name) > 100:
            registration_error.messages.append("Length of last name must be between 2 and 100 characters inclusive")
            self.error_messages.append("Length of last name must be between 2 and 100 characters inclusive")


        # Email address validation
        # if not re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', employee_obj.email_address):
        #     registration_error.messages.append("Email address must match format username@domain")

        if self.employee_dao.check_employee_by_email(email_address) is not None:
            self.error_messages.append("Email is already in use")
            registration_error.messages.append("Email already in use")

        if len(registration_error.messages) > 0:
            raise RegistrationError
        added_user_obj = self.employee_dao.add_employee(employee_id, username, employee_password, first_name, last_name, '0', email_address)
        return added_user_obj.to_dict()

