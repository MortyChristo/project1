import json

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

@rc.route("/login/reimbursement/approve/<reimbursement_id>", methods= ['GET'])
def change_reimbursement_status_a(reimbursement_id):
    session.clear()
    try:
        return {
         "reimbursement": reimbursement_service.change_status_a(reimbursement_id)
        }, 201
    except ReimbursementError as e:
        return {
            "messages": str(e)
        }, 401

@rc.route("/login/reimbursement/deny/<reimbursement_id>", methods= ['GET'])
def change_reimbursement_status_d(reimbursement_id):
    session.clear()
    try:
        return {
         "reimbursement": reimbursement_service.change_status_d(reimbursement_id)
        }, 201
    except ReimbursementError as e:
        return {
            "messages": str(e)
        }, 401

@rc.route("/login/reimbursement/employee/<employee_id>", methods=['GET'])
def view_reimbursement(employee_id):
    try:
        return {
            "reimbursement": reimbursement_service.view_reimbursements_by_id(employee_id)
        }, 201
    except ReimbursementError as e:

         return {
          "messages": str(e)
         }, 401






@rc.route("/login/reimbursement/manager", methods=['GET'])
def view_all_reimbursement():
    session.clear()
    try:
        reimbursement_dict = reimbursement_service.view_all_reimbursements()


        return {
            "reimbursement": reimbursement_dict
               }, 200

    except ReimbursementError as e:
         return {
          "messages": str(e)
         }, 401



@rc.route("/login/reimbursement/manager/status", methods=['GET'])
def view_all_reimbursement_status():
    session.clear()
    try:
        reimbursement_dict = reimbursement_service.view_all_reimbursements_status()


        return {
            "reimbursement": reimbursement_dict
               }, 200

    except ReimbursementError as e:
         return {
          "messages": str(e)
         }, 401


@rc.route("/login/reimbursement/manager/employee", methods=['GET'])
def view_employee_id():
    session.clear()
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
    img = request.files["png"]

    imageFile = img

    nameFile = img.name

    print(nameFile)

    employee_id = dict['employee_id'][0]
    amount = dict["amount"][0]
    type_of_reimbursement = dict['type_of_reimbursement'][0]
    description = dict['description'][0]
    status = "Pending"
    print(employee_id)
    print(amount)
    print(type_of_reimbursement)
    print(description)

    try:
        reimbursement_added = reimbursement_service.add_reimbursement(Reimbursements(employee_id, amount, status, type_of_reimbursement, description, None))
        print(reimbursement_added)
    except RegistrationError as e:  ##Change this error
        return {
            "messages": e.messages
        }, 400

    return {
               "reimbursement_added": reimbursement_added
           }, 201



