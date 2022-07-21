from flask import Blueprint, request, session

import backend.services.reimbursement_services
from backend.exception.registration import RegistrationError
from backend.services.reimbursement_services import ReimbursementService
from backend.model.reimbursement import Reimbursements
from backend.exception.reimbursement_error import ReimbursementError

rc = Blueprint('reimbursement_controller', __name__)

reimbursement_service = ReimbursementService()

@rc.route("/login/reimbursement/employee/<employee_id>")

def view_reimbursement():
    session.clear()
    try:
        return {
            "reimbursement": reimbursement_service.view_reimbursements(employee_id)

        }, 201
    except ReimbursementError as e:
         return {
          "messages": str(e)
         }, 401






@rc.route("/login/reimbursement/manager", methods=['GET'])
def view_all_reimbursement():

    try:
        reimbursement_dict = reimbursement_service.view_all_reimbursements()
        session.clear()

        return {
            "reimbursement": reimbursement_dict
               }, 200

    except ReimbursementError as e:
         return {
          "messages": str(e)
         }, 401


@rc.route("/login/reimbursement/add", methods=['POST'])
def add_reimbursement():
    request_body_dict = request.get_json()

    employee_id = request_body_dict.get('employee_id')
    type_of_reimbursement = request_body_dict.get('type_of_reimbursement')
    description = request_body_dict.get('description')
    status = "Pending"

    try:
        reimbursement_added = reimbursement_service.add_reimbursement(Reimbursements(employee_id, status, type_of_reimbursement, description))

    except RegistrationError as e:  ##Change this error
        return {
            "messages": e.messages
        }, 400

    return {
               "reimbursement_added": reimbursement_added
           }, 201



