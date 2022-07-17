from flask import Flask, Blueprint, request
from backend.controller.employee_controller import ec
from backend.controller.reimbursement_controller import rc
from flask_cors import CORS
from flask_session import Session



if __name__ == "__main__":
    app = Flask(__name__)
    app.secret_key = 'Revature'
    app.config['SESSION_TYPE'] = 'filesystem'

    CORS(app)  # Instructs our webserver to tell browsers that any origin is allowed. By origin we mean the source
    # where the HTML, CSS, and JS are originating from

    Session(app)

    app.register_blueprint(ec)
    app.register_blueprint(rc)


    app.run(port=8080, debug=True)