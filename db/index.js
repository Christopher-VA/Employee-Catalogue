const connection = require("../config/connections");

function findAllEmployees() {
  return connection.promise().query(
    "SELECT * FROM employee"
  );
}

function findAllRoles() {
  return connection.promise().query(
    "SELECT * FROM role"
  )
}

function findAllDepartments() {
  return connection.promise().query(
    "SELECT * FROM department;"
  );
}

module.exports = {findAllEmployees, findAllRoles, findAllDepartments};