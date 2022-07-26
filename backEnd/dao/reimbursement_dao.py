import os
import psycopg
from backend.model.reimbursement import Reimbursements
from backend.model.employee_id import Employee_id
from pathlib import Path
from datetime import datetime


class ReimbursementDao:
    def add_reimbursement(self, reimbursement_obj):
        dt = datetime.now()
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:

                cur.execute("INSERT INTO reimbursements(employee_id, status, type_of_reimbursement, description, amount, imageFile, nameFile, createdTime)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) returning *", (reimbursement_obj.employee_id, reimbursement_obj.status, reimbursement_obj.type_of_reimbursement,
                                                                        reimbursement_obj.description, reimbursement_obj.amount, reimbursement_obj.imageFile,
                                                                        reimbursement_obj.nameFile, dt))
                reimbursement_row = cur.fetchone()
                conn.commit()

                return Reimbursements(reimbursement_row[0], reimbursement_row[1], reimbursement_row[2], reimbursement_row[3],
                                      reimbursement_row[4], reimbursement_row[5], reimbursement_row[6], reimbursement_row[7],
                                      reimbursement_row[8], reimbursement_row[9], reimbursement_row[10])

    def view_reimbursements(self, employee_id):

        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM reimbursements WHERE employee_id = %s", (employee_id,))
                reimbursement_list = []
                for reimbursement_row in cur:

                    r_dict = [reimbursement_row[0], reimbursement_row[1], reimbursement_row[2], reimbursement_row[3],
                              reimbursement_row[4], reimbursement_row[5], reimbursement_row[6], reimbursement_row[7],
                              reimbursement_row[8], reimbursement_row[10]]

                    reimbursement_list.append(r_dict)

                    if (open('../frontEnd/receipts/' + str(reimbursement_row[5]) + '.jpg', 'wb')) is None:
                        open('../frontEnd/receipts/' + str(reimbursement_row[5]) + '.jpg', 'wb').write(
                            reimbursement_row[9].encode())

                return reimbursement_list

    def view_all_reimbursements_status(self):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM reimbursements ORDER BY status DESC")
                reimbursement_list = []
                for reimbursement_row in cur:

                    pic = open('../frontEnd/receipts/' + str(reimbursement_row[5]) + '.jpeg', 'wb').write(
                            reimbursement_row[9].encode())
                    r_dict = [reimbursement_row[0], reimbursement_row[1], reimbursement_row[2], reimbursement_row[3],
                              reimbursement_row[4], reimbursement_row[5], reimbursement_row[6], reimbursement_row[7],
                              reimbursement_row[8], pic, reimbursement_row[10]]

                    reimbursement_list.append(r_dict)



                return reimbursement_list


    def view_employee(self):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT employee_id FROM employees WHERE employee_type != 1")
                employee_list = []
                for row in cur:
                    employee_list.append(Employee_id(row))

                return employee_list



    def change_status_d(self, reimbursement_id, resolver, status):
        dt = datetime.now()
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="YeMother6") as conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE reimbursements SET status = %s WHERE reimbursement_ID = %s", (status, reimbursement_id))
                cur.execute("UPDATE reimbursements SET resolver = %s WHERE reimbursement_ID = %s", (resolver, reimbursement_id))
                cur.execute("UPDATE reimbursements SET resolvedTime = %s WHERE reimbursement_ID = %s RETURNING *", (dt, reimbursement_id))

                employee_list = []
                for row in cur:
                    employee_list.append(Employee_id(row))
                return employee_list