import psycopg

from model.employee import Employee


class EmployeeDao:


    def get_user_by_username_and_password(self, username, employee_password):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres",
                             password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from employees WHERE username = %s AND employee_password = %s", (username, employee_password))

                user_info = cur.fetchone()

                if user_info is None:
                    return None
                employee_id = user_info[0]
                username = user_info[1]
                password = user_info[2]
                first_name = user_info[3]
                last_name = user_info[4]
                email_address = user_info[5]

                return Employee(employee_id, username, password, first_name, last_name, email_address)
