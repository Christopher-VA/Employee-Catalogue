const inquirer = require('inquirer');
const {findAllEmployees, findAllRoles, findAllDepartments} = require('./db/index.js');
const db = require('./config/connections.js');
const connection = require('./config/connections.js');

// Makes the beginning question of what the user wants to do
function init() {
    inquirer
        .prompt({
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "quit"],
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
                case "quit":
                    db.end();
                    console.log("Database Closing!");
                    break;
                    // closes database
            }
        })
}

// checks departments
function departments() {
    const query = findAllDepartments().then(data => console.log(data));
    init();
}

// checks roles
function roles() {
    const query = findAllRoles().then(data => console.log(data));
    init();
}

// checks employees
function employees() {
    const query = findAllEmployees().then(data => console.log(data));
    init();
}

// adds departments
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Please name new department:",
        })
        .then((answer) => {
            console.log(answer.name)
            const query = `INSERT INTO department (department_name) VALUES ("${answer.name}")`;
            db.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Added department ${answer.name} to the database!`);
                init();
                console.log(answer.name);
            });
        })
}

// adds roles
function addRole() {
    const query = "SELECT * FROM department";
    db.query(query, (err, res) => {
        if (err) throw err;
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
                const query = "INSERT INTO role SET ?";
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
                        init();
                    }
                );
            });
    });
};

// adds employees
function addEmployee() {
    db.query("SELECT id, title FROM role", (err, res) => {
        if (err) {
            console.err(err);
            return;
        }

        const role = res.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

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
            choices: role,
        }
        ])
        .then((answer) => {
            const sql = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
            const employee = [
                answer.firstName,
                answer.lastName,
                answer.idRole,
            ];
            db.query(sql, employee, (err) => {
                if (err) {
                    console.err(err);
                    return;
                }

                console.log(`${answer.firstName}` + ` ` + `${answer.lastName} was added!` )
                init()
            })
        })
    });
}

init();
