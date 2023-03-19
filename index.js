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
  while (!quitSelected) {
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
}  

function addDeptQuestion() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'new_department',
      message: 'What is the name of the department?',
    },
]);
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
  await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the role title?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary?',
    },
    {
      type: 'input',
      name: 'department',
      message: 'What is the department id?',
    },
]).then(data => {
  let query = `INSERT INTO role(title, salary, department_id) VALUES ('${data.title}','${data.salary}','${data.department}');`;

  connection.query(query,(err, res) => {
    if (err) throw err;
      console.table(res);
      mainOptions();
  })
})
}

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