from flask import Blueprint, request, session

from backend.exception.login_error import LoginError
from backend.exception.registration import RegistrationError
from backend.model.employee import Employee
from backend.services.employee_servies import EmployeeService
from backend.controller.reimbursement_controller import view_reimbursement

ec = Blueprint("user_controller", __name__)
employee_service = EmployeeService()


@ec.route('/loginstatus', methods=['GET'])
def loginstatus():
    if session.get('user_info') is not None:
        return {
            "message": "You are logged in",
            "logged_in_user": session.get('user_info')
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
        ##login not saving,need to prevent double logins
    try:
        employee_dict = employee_service.login(username, password)

        # We add a key to the Http session object called 'user_info' that contains the dictionary
        # with all of the user information
        # Any subsequent request that is made by the client will be identified with the appropriate Http session
        # object that contains that key
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