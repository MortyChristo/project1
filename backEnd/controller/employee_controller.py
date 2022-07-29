from flask import Blueprint, request, session
from backend.exception.login_error import LoginError
from backend.exception.registration_error import RegistrationError
from backend.model.employee import Employee
from backend.services.employee_servies import EmployeeService
import bcrypt
import PIL

ec = Blueprint("user_controller", __name__)
employee_service = EmployeeService()


@ec.route('/loginstatus', methods=['GET'])
def loginstatus():

    if session.get('employee_dict') is not None:
        temp_dict = session.get('employee_dict')

        return {
            "message": "You are logged in",
            "logged_in_user": (temp_dict['first_name'] + " " + temp_dict['last_name'])
        }, 200
    else:
        return {
            "message": "You are not logged in"
        }, 400


@ec.route('/logout', methods=['POST'])
def logout():
    session.clear()

    return {
        "message": "Successfully logged out"
    }, 200


@ec.route('/login/<username>/<password>', methods=['GET'])
def login(username, password):

    try:
        employee_dict = employee_service.login(username, password)
        session['username'] = username
        session['password'] = password
        return employee_dict, 200
    except LoginError as e:
        return {
            "message": str(e)
        }, 400

@ec.route("/login/register", methods=['POST'])
def register_employee():
    session.clear()
    request_body_dict = request.get_json()
    employee_id = request_body_dict['employee_id']
    username = request_body_dict['username']
    password = request_body_dict['employee_password']
    first_name = request_body_dict['first_name']
    last_name = request_body_dict['last_name']
    email_address = request_body_dict['email_address']
    try:

        added_user = employee_service.add_employee(employee_id, username, password, first_name, last_name, '0', email_address)

        return added_user, 200

    except RegistrationError as e:
        return {
            "messages": employee_service.error_messages
        }, 400
