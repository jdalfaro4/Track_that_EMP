const inquirer = require('inquirer');
const mysql = require('mysql2');


const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


function runProgram() {
  mainOptions();
};

async function mainOptions() {
  let quitSelected = false;

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'main_questions',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit',],
    },
  ]);

switch (answers.main_questions) {
  case 'View All Employees':
    viewAllEmployee();
    break;

  case 'Add Employee':
    addNewEmployeeQuestion();
    break;

  case 'Update Employee Role':
    updateEmployeeRoleQuestion();
    break;

  case 'View All Roles':
    viewAllRoles();
    break;

  case 'Add Role':
    debugger
    addRoleQuestion();
    break;

  case 'View All Departments':
    viewAllDepartments();
    break;

  case 'Add Department':
    addDeptQuestion();
    break;

  case 'Quit':
    quitSelected = true;
    break;
}
}

async function addDeptQuestion() {
  await inquirer.prompt([{
    type: 'input',
    message: "What department would you like to add?",
    name: 'department'
}
])

    connection.promise().query(`INSERT INTO department (department_name) VALUES ("${data.department}");`);
        if (err) {
            console.log(err);
        } else {
            console.table(result);
            mainOptions();
        }
    }


function viewAllRoles () {
  let query = 'SELECT * FROM role';
  //placeholder for database connection 
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainOptions();
  });
}

function viewAllDepartments() {
  let query = 'SELECT * FROM department';
  //placeholder for database connection 
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainOptions();
  });
}

function viewAllEmployee() {
  let query = 'SELECT * FROM employee';
    //placeholder for database connection 
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      mainOptions();
    });
}

async function addRoleQuestion() {
  let query = 'SELECT * FROM department';
    //placeholder for database connection 
    const result = await connection.promise().query(query);
    const data = result[0];
      // mainOptions();

      let departmentArray = [];
      for (let i = 0; i < data.length; i++) {
          const d = data[i].department_name;
          departmentArray.push(d)
      }
      let queryRole = 'SELECT * FROM role';
        const roleResult = await connection.promise().query(queryRole);
        const roledata = roleResult[0];
        
      let roleArray = [];
      for (let i = 0; i < roledata.length; i++) {
          const d = roledata[i].role_name;
          roleArray.push(d)
      }

      inquirer.prompt([{
                type: 'list',
                message: "What role would you like to add?",
                name: 'title',
                choices: roleArray
            }, {
                type: 'input',
                message: "What is the salary for this role?",
                name: 'salary'
            }, {
                type: 'list',
                message: "Which department does this role belong to?",
                name: "department",
                choices: departmentArray
            }
          ]);


          let departmentID = departmentArray.indexOf(data.department) + 1;
          await connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${departmentID});`);
}



// async function addRoleQuestion() {
//   // const result = await connection.promise().query(`SELECT * FROM department;`);
    
//     let departmentArray = [];
//     // for (let i = 0; i < result.length; i++) {
//     //     const d = result[i].department_name;
//     //     departmentArray.push(d)
//     // }
//     inquirer.prompt([{
//         type: 'input',
//         message: "What role would you like to add?",
//         name: 'title'
//     }, {
//         type: 'input',
//         message: "What is the salary for this role?",
//         name: 'salary'
//     }, {
//         type: 'list',
//         message: "Which department does this role belong to?",
//         name: "department",
//         choices: departmentArray
//     }
//     ])
//     // .then(async (data) => {
//     //     let departmentID = departmentArray.indexOf(data.department) + 1;
//     //     await connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${departmentID});`, function (err, result) {
//     //         if (err) {
//     //             console.log(err);
//     //         } else {
//     //             console.table(result);
//     //             mainOptions();
//     //         }
//     //     })
//     // });
// }

function addNewEmployeeQuestion() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'new_empployee_fn',
      message: 'What is the employees first name?',
    },
    {
      type: 'input',
      name: 'new_empployee_ln',
      message: 'What is the employees last name?',
    },
    {
      type: 'list',
      name: 'new_employee_role',
      message: 'What is the employees role?',
      choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service',],
    },
    {
      type: 'list',
      name: 'new_employees_manager',
      message: 'Who is the employees manager?',
      choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd',],
    },
]);
}

function updateEmployeeRoleQuestion() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee_for_role_update',
      message: 'Which employees role do you want to update?',
      choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd',],
    },
    {
      type: 'list',
      name: 'updated_employee_role',
      message: 'Which role do you want to assign the selected employee?',
      choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service',],
    },
]);
}

runProgram();