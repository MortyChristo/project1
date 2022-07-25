import json
import numpy
from flask import Blueprint, request, session
from backend.services.employee_servies import EmployeeService
import backend.services.reimbursement_services
from backend.exception.registration_error import RegistrationError
from backend.services.reimbursement_services import ReimbursementService
from backend.model.reimbursement import Reimbursements
from backend.exception.reimbursement_error import ReimbursementError
import werkzeug

rc = Blueprint('reimbursement_controller', __name__)

reimbursement_service = ReimbursementService()
employee_service = EmployeeService()


@rc.route("/login/reimbursement/status-change", methods= ['PUT'])
def change_reimbursement_status_d():
    json_dictionary = request.get_json()
    rid = json_dictionary['reimbursement_id']
    resolver = json_dictionary['resolver_id']
    change_to = json_dictionary['status']

    try:
        return {
         "reimbursement": reimbursement_service.change_status_d(rid, resolver, change_to)
        }, 201

    except ReimbursementError as e:
        return {
            "messages": str(e)
        }, 401


@rc.route("/login/reimbursement/employee/<employee_id>", methods=['GET'])
def view_reimbursement(employee_id):
    try:
        re_obj = reimbursement_service.view_reimbursements_by_id(employee_id)
        return {
            "reimbursement": re_obj

        }, 201

    except ReimbursementError as e:
        return {
            "messages": str(e)
         }, 401


@rc.route("/login/reimbursement/manager/status", methods=['GET'])
def view_all_reimbursement_status():
    try:
        reimbursement_dict = reimbursement_service.view_all_reimbursements_status()
        print(type(reimbursement_dict))

        return {
            "reimbursement": reimbursement_dict
               }, 200

    except ReimbursementError as e:
        return {
          "messages": str(e)
         }, 401


@rc.route("/login/reimbursement/manager/employee", methods=['GET'])
def view_employee_id():
    try:
        reimbursement_dict = reimbursement_service.view_employee()
        return {
            "reimbursement": reimbursement_dict
               }, 200

    except ReimbursementError as e:
        return {
            "messages": str(e)
         }, 401


@rc.route("/login/reimbursement/add", methods=['POST'])
def add_reimbursement():
    data = request.form
    dict = data.to_dict(flat=False)
    img = request.files['png']
    imageFile = img.read()
    nameFile = img.name

    employee_id = dict['employee_id'][0]
    amount = dict["amount"][0]
    type_of_reimbursement = dict['type_of_reimbursement'][0]
    description = dict['description'][0]
    status = "Pending"

    try:

        reimbursement_added =   reimbursement_service.add_reimbursement(Reimbursements(employee_id, amount, status,
                                                                                       type_of_reimbursement, description,
                                                                                       None, "N/A", "N/A",
                                                                                       "N/A", imageFile, nameFile))
    except RegistrationError as e:  ##Change this error
        return {
            "messages": e.messages
        }, 400

    return {
               "reimbursement_added": reimbursement_added
           }, 201



