from flask import Blueprint, request, session
from backend.exception.registration import RegistrationError
from backend.services.reimbursement_services import ReimbursementService
from backend.model.reimbursement import Reimbursements

rc = Blueprint('reimbursement_controller', __name__)

reimbursement_service = ReimbursementService()

@rc.route("/login/reimbursement", methods=['POST'])
def add_reimbursement():
    request_body_dict = request.get_json()

    employee_id = request_body_dict.get('employee_id')
    type_of_reimbursement = request_body_dict.get('type_of_reimbursement')
    description = request_body_dict.get('description')
    status = "Pending"
###make strip function for variables to store the absolute
    try:
        reimbursement_added = reimbursement_service.add_reimbursement(Reimbursements(employee_id, status, type_of_reimbursement, description))


    except RegistrationError as e:  ##Change this error
        return {
            "messages": e.messages
        }, 400

    return reimbursement_added, 201
