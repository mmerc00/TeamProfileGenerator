// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//module export goes on bottom
const Employee = require("./Employee.js");
//extends from employee class as mentioned above
class Manager extends Employee {
  constructor(name, id, email, github, type) {
    super(name, email, id);
    this.officeNumber = officeNumber;
    this.getOfficeNumber = function () {
      return this.officeNumber;
    };
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;

//place methods outside of contructor
