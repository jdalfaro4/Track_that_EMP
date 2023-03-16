INSERT INTO department (id, department_name)
VALUES (1, "Sales"),
       (2, "Legal"),
       (3, "Finance"),
       (4, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 1)
        (2, "Salesperson", 80000, 1)
        (3, "Lead Engineer", 150000, 4)
        (4, "Software Engineer", 120000, 4)
        (5, "Account Manager", 160000, 3)
        (6, "Accountant", 125000, 3)
        (7, "Legal Team Lead", 250000, 2)
        (8, "Lawyer", 190000, 2)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (11, "John", "Doe", 1, NULL)
        (22, "Mike", "Chan", 2, 11)
        (33, "Ashley", "Rodriguez", 3, NULL)
        (44, "Kevin", "Tupik", 4, 33)
        (55, "Kunal", "Singh", 5, NULL)
        (66, "Malia", "Brown", 6, 55)
        (77, "Sarah", "Lourd", 7, NULL)
        (88, "Tom", "Allen", 8, 77)
