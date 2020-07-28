// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//module export goes on bottom
const Employee = require("./Employee.js");
//extends from employee class as mentioned above
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
