const inquirer = require('inquirer');

const questions = [{
    type: 'list',
    name: 'question',
    message: 'What would you like to do?',
    option: ['Add Employee', 'Delete Employee', 'Add Department', 'Delete Department', 'Add Role', 'Delete Role', 'Update Employee Role', 'Update Employee Department']
}
];