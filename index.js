const inquirer = require('inquirer');
const {findAllEmployees} = require('./db/index.js');
const db = require('./config/connections.js');

function init() {
    inquirer
        .prompt({
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"],
        })
        .then((answer) => {
            switch (answer.command) {
                case "view all departments":
                    departments();
                    break;
                case "view all roles":
                    roles();
                    break;
                case "view all employees":
                    employees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
            }
        })
}

function departments() {
    const query = `SELECT * FROM departments`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function roles() {
    const query = `SELECT * FROM roles`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function employees() {
    // findAllEmployees().then(data => console.log(data));
    const query = findAllEmployees();
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Please name new department:",
        })
        .then((answer) => {
            console.log(answer.name)
            const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
            db.query(query, (err, res) => {
                if (err) throw err;
                console.log(`New department ${answer.name} added!`);
                init();
            });
        })
}

function addRole() {
        inquirer
            .prompt([{
                    type: "input",
                    name: "title",
                    message: "Enter new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter salary:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Select department for role:",
                    choices: res.map(
                        (department) => department.department_name
                    ),
                },
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.name === answers.department
                );
                const query = "INSERT INTO roles SET ?";
                db.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`New role ${answers.title} added!`);
                        start();
                    }
                );
            });
};

function addEmployee() {
    inquirer
        .prompt([{
            type: "input",
            name: "firstName",
            message: "Enter name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter last name"
        },
        {
            type: "list",
            name: "idRole",
            message: "Select their role",
            choices: roles,
        },
        {
            type: "list",
            name: "idManager",
            message: "Select their manager",
            choices: manager_id,
        }
        ])
        .then((answer) => {
            const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            const employee = [
                answer.firstName,
                answer.lastName,
                answer.idRole,
                answer.idManager,
            ];
            db.query(sql, employee, (err) => {
                if (err) {
                    console.table(res);
                    return;
                }
                init()
            })
        })
}

init();
