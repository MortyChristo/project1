from flask import Blueprint, request, session

from exception.login_error import LoginError
from exception.registration import RegistrationError
from model.employee import Employee
from services.employee_servies import EmployeeService

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

