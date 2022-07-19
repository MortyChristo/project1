from flask import Blueprint, request, session
from flask_session import Session
from backend.exception.login_error import LoginError
from backend.exception.registration import RegistrationError
from backend.model.employee import Employee
from backend.services.employee_servies import EmployeeService
from backend.controller.reimbursement_controller import view_reimbursement

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
        }, 200


@ec.route('/logout', methods=['POST'])
def logout():
    session.clear()

    return {
        "message": "Successfully logged out"
    }, 200


@ec.route('/login', methods=['POST'])
def login():
    request_body_dict = request.get_json()
    username = request_body_dict['username']
    password = request_body_dict['password']

    try:
        employee_dict = employee_service.login(username, password)
        session['employee_dict'] = employee_dict
        return employee_dict, 200
    except LoginError as e:
        return {
            "message": str(e)
        }, 400

@ec.route("/register", methods=['POST'])
def register_employee():
    request_body_dict = request.get_json()

    employee_id = request_body_dict.get('employee_id')
    username = request_body_dict.get('username')
    password = request_body_dict.get('password')
    first_name = request_body_dict.get('first_name')
    last_name = request_body_dict.get('last_name')
    email_address = request_body_dict.get('email_address')


    try:
        added_user = employee_service.add_employee(Employee(employee_id, username, password, first_name, last_name, email_address))
    except RegistrationError as e:
        return {
            "messages": e.messages
        }, 400

    return added_user, 201