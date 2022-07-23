import psycopg
from backend.model.reimbursement import Reimbursements
from backend.model.employee_id import Employee_id

class ReimbursementDao:
    def add_reimbursement(self, reimbursement_obj):

        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:

                cur.execute("INSERT INTO reimbursements(employee_id, status, type_of_reimbursement, description, amount)"
                "VALUES (%s, %s, %s, %s, %s) returning *", (reimbursement_obj.employee_id, reimbursement_obj.status, reimbursement_obj.type_of_reimbursement, reimbursement_obj.description, reimbursement_obj.amount))
                reimbursement_row = cur.fetchone()
                conn.commit()


                return Reimbursements(reimbursement_row[0], reimbursement_row[1], reimbursement_row[2], reimbursement_row[3], reimbursement_row[4], reimbursement_row[5])

    def view_all_reimbursements(self):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM reimbursements")
                reimbursement_list = []
                for row in cur:
                    reimbursement_list.append(Reimbursements(row[0], row[1], row[2], row[3], row[4], row[5]))

                return reimbursement_list

    def view_reimbursements(self, employee_id):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM reimbursements WHERE employee_id = %s", (employee_id,))
                reimbursement_list = []
                for row in cur:
                    reimbursement_list.append(Reimbursements(row[0], row[1], row[2], row[3], row[4], row[5]))
                return reimbursement_list

    def view_all_reimbursements_status(self):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM reimbursements ORDER BY status DESC")
                reimbursement_list = []
                for row in cur:
                    reimbursement_list.append(Reimbursements(row[0], row[1], row[2], row[3], row[4], row[5]))
                return reimbursement_list


    def view_employee(self):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT employee_id FROM employees")
                employee_list = []
                for row in cur:
                    employee_list.append(Employee_id(row))

                return employee_list


    def change_status_a(self, reimbursement_id):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE reimbursements SET status = 'Approved' WHERE reimbursement_ID = %s RETURNING *", (reimbursement_id,))
                employee_list = []
                for row in cur:
                    employee_list.append(Employee_id(row))
                return employee_list


    def change_status_d(self, reimbursement_id):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE reimbursements SET status = 'Denied' WHERE reimbursement_ID = %s RETURNING *", (reimbursement_id,))
                employee_list = []
                for row in cur:
                    employee_list.append(Employee_id(row))
                return employee_list