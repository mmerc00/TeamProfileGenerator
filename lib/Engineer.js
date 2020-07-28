// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
//constructor function
class Engineer extends Employee {
  constructor(name, id, email, github) {
    //added super to grab elements
    super(name, id, email);
    this.getGithub = function () {
      return this.github;
    };
  }
  //returning
  getName() {
    return "Engineer";
  }
}

module.exports = Engineer;
