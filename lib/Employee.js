// TODO: Write code to define and export the Employee class
const Employee = require("./Employee");

//make a constructer
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.getName = function () {};
  }
}

// getRole() {
//   return "Engineer";
// }

module.exports = Employee;
//module export on the bottom
