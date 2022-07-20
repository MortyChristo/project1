from flask import Flask, Blueprint, request, session
from backend.controller.employee_controller import ec
from backend.controller.reimbursement_controller import rc
from flask_cors import CORS
from flask_session import Session




if __name__ == "__main__":
    app = Flask(__name__)
    app.secret_key = 'Revature'
    app.config['SESSION_TYPE'] = 'filesystem'

    CORS(app, supports_credentials=True)

    Session(app)

    app.register_blueprint(ec)
    app.register_blueprint(rc)


    app.run(port=8080, debug=True)




