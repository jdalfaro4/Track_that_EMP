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
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
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
    process.exit(0);
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
      const departmentArray = data.map(({ id, department_name }) => ({
        name: department_name,
        value: id
      }));

      let queryRole = 'SELECT * FROM role';
        const roleResult = await connection.promise().query(queryRole);
        const roledata = roleResult[0];
        
        const roleArray = roledata.map(({ title }) => ({
          name: title,
          value: title
        }));

      const answers = await inquirer.prompt([{
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

          // let departmentID = departmentArray.indexOf(data.department) + 1;
          await connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.department});`);

          mainOptions();
}




async function addNewEmployeeQuestion() {
      // let choiceArray = ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd',];
      let queryMan = 'SELECT * FROM employee';
      const managerResult = await connection.promise().query(queryMan);
      const managerData = managerResult[0];
      
      const managerArray = managerData.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));


      let queryRole = 'SELECT * FROM role';
      const roleResult = await connection.promise().query(queryRole);
      const roledata = roleResult[0];
      
      const roleArray = roledata.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      const answers = await inquirer.prompt([
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
        choices: roleArray
      },
      {
        type: 'list',
        name: 'new_employees_manager',
        message: 'Who is the employees manager?',
        choices: managerArray
      },
      ]);
      console.log(answers)

  await connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.new_empployee_fn}", "${answers.new_empployee_ln}", ${answers.new_employee_role}, ${answers.new_employees_manager});`);

          mainOptions();
  }

async function updateEmployeeRoleQuestion() {
  let queryRole = 'SELECT * FROM role';
      const roleResult = await connection.promise().query(queryRole);
      const roledata = roleResult[0];
      
      const roleArray = roledata.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      let queryEmp = 'SELECT * FROM employee';
      const empResult = await connection.promise().query(queryEmp);
      const empData = empResult[0];
      
      const empArray = empData.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));


  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_for_role_update',
      message: 'Which employees role do you want to update?',
      choices: empArray
    },
    {
      type: 'list',
      name: 'updated_employee_role',
      message: 'Which role do you want to assign the selected employee?',
      choices: roleArray
    },
]);

await connection.promise().query(`UPDATE employee SET role_id = ${answers.updated_employee_role} WHERE id = ${answers.employee_for_role_update};`)

  mainOptions();
}

runProgram();