import psycopg
from backend.model.reimbursement import Reimbursements

class ReimbursementDao:
    def add_reimbursement(self, reimbursement_obj):

        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("INSERT INTO reimbursements(employee_id, status, type_of_reimbursement, description)"
                "VALUES (%s, %s, %s, %s) returning *", (reimbursement_obj.employee_id, reimbursement_obj.status,
                                                        reimbursement_obj.type_of_reimbursement, reimbursement_obj.description))
                reimbursement_row = cur.fetchone()
                conn.commit()


                return Reimbursements(reimbursement_row[0], reimbursement_row[1], reimbursement_row[2], reimbursement_row[3])

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
