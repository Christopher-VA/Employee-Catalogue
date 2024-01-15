const connection = require("../config/connections");

function findAllEmployees() {
  return this.connection.promise().query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  );
}

function findAllRoles() {
  return this.connection.promise().query(
    "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id;"
  )
}

function findAllDepartments() {
  return this.connection.promise().query(
    "SELECT * FROM departments;"
  );
}

function addDepartments() {
  return this.connection.promise().query(
    `INSERT INTO departments (department_name) VALUES ("${answer.name}")`
  );
}

function addRoles() {
  return this.connection.promise().query(
    ""
  );
}

function addEmployee() {
  return this.connection.promise().query(
    ""
  );
}

module.exports = {findAllEmployees};