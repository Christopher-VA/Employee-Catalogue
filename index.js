const inquirer = require('inquirer');
const mysql = require("mysql2");

function init() {
    inquirer
        .prompt({
            type: "list",
            name: "command",
            message: "What would you like to do?",
            option: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"],
        })
        .then((answer) => {
            switch (answer.command) {
                case "view all departments":
                    departments();
                    break;
            }
        })
}

function departments() {
    const query = "SELECT * FROM departments";
    console.log(query);
    init();
}

init();