import psycopg
import bcrypt
from bcrypt import hashpw

from backend.model.employee import Employee


class EmployeeDao:

    def get_user_by_username(self, username, password):



        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE username = %s ", (username,))

                user_info = cur.fetchone()

                if user_info is None:
                    return None
                emcodedPass = password.encode()

                if (bcrypt.checkpw(emcodedPass, user_info[2].encode())):

                    employee_id = user_info[0]
                    username = user_info[1]

                    first_name = user_info[3]
                    last_name = user_info[4]
                    employee_type = user_info[5]
                    email_address = user_info[6]

                    return Employee(employee_id, username, password, first_name, last_name, employee_type, email_address)
                else:
                    return None





    def add_employee(self, employee_id, username, employee_password, first_name, last_name, employee_type, email_address):
        password = employee_password
        if (employee_password != ""):
            salt = bcrypt.gensalt()
            bytePass = password.encode()
            hashed = bcrypt.hashpw(bytePass, salt)
            hashed2 = hashed.decode()
        else:
            hashed2 = ""

        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("INSERT INTO employees VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *",
                            (employee_id,
                             username,
                             hashed2,
                             first_name,
                             last_name,
                             employee_type,
                             email_address))

                user_that_was_inserted = cur.fetchone()
                conn.commit()

                return Employee(user_that_was_inserted[0], user_that_was_inserted[1], password, user_that_was_inserted[3], user_that_was_inserted[4], user_that_was_inserted[5], user_that_was_inserted[6])

    def get_user_by_email(self, email_address):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE email_address = %s", (email_address,))

                user_info = cur.fetchone()

                if user_info is None:
                    return None

                employee_id = user_info[0]
                username = user_info[1]
                password = user_info[2]
                first_name = user_info[3]
                last_name = user_info[4]
                email_address = user_info[5]


                return Employee(employee_id, username, password, first_name, last_name, '0', email_address)

    def get_employee_by_username(self, username):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE username = %s", (username,))

                user_info = cur.fetchone()

                if user_info is None:
                    return None

                employee_id = user_info[0]
                username = user_info[1]
                password = user_info[2]
                first_name = user_info[3]
                last_name = user_info[4]
                email_address = user_info[5]

                return Employee(employee_id, username, password, first_name, last_name, '0', email_address)


    def check_employee_by_email(self, email_address):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE email_address = %s", (email_address,))

                user_info = cur.fetchone()

                if user_info is None:
                    return None

                else:
                    return True

    def check_employee_by_employee_id(self, employee_id):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE employee_id = %s", (str(employee_id),))

                user_info = cur.fetchone()

                if user_info is None:
                    return None
                else:
                    return True

    def check_employee_by_username(self, username):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE username = %s", (username,))

                user_info = cur.fetchone()

                if user_info is None:
                    return None

                else:
                    return True