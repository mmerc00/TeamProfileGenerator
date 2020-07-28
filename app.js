const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);
//empty team array
let teamArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//HELPER FUNCTIONS FOR THE ADD TEAM MEMBER =====
function addTeamMember() {
  return inquirer
    .prompt(questions.addTeamMember)
    .then(function (answers) {
      if (answers.addMember) {
        promptQuesitons();
      } else {
        renderFiles();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//function user prompt questions
//made a function instead of a const

function promptQuesitons() {
  inquirer
    .prompt(questions.promptRole)
    .then(function (reply) {
      switch (reply.role) {
        case "Manager":
          return buildManager();
        case "Intern":
          return buildIntern();
        case "Engineer":
          return buildEngineer();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function buildManager() {
  inquirer
    .prompt(questions.buildManager)
    //.then gathers the information above
    .then(function (managerReply) {
      //making a new object
      teamArray.push(
        new Manager(
          managerReply.name,
          managerReply.id,
          managerReply.email,
          managerReply.officeNumber
        )
      );
      //run new team member function (this confuses me)
      addTeamMember();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function buildIntern() {
  inquirer
    .prompt(questions.buildIntern)
    .then(function (internReply) {
      teamArray.push(
        new Intern(
          internReply.name,
          internReply.id,
          internReply.email,
          internReply.school
        )
      );
      addTeamMember();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function buildEngineer() {
  inquirer
    .prompt(questions.buildEngineer)
    .then(function (engineerReply) {
      teamArray.push(
        new Engineer(
          engineerReply.name,
          engineerReply.id,
          engineerReply.email,
          engineerReply.github
        )
      );
      addTeamMember();
    })
    .catch(function (err) {
      console.log(err);
    });
}

//working on this
//new team memeber function
// function newTeamMember(reply) {

// generate html here

function init() {
  promptQuesitons();
}
init();

async function renderFiles() {
  try {
    const userAnswers = await render(teamArray);
    writeFileAsync(outputPath, userAnswers);
  } catch (err) {
    console.log(err);
  }
}

// function generateHtml (){
//   render ()
// }
//promptUser();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//inquirer. prompt
//init function goes here no init
//have to call user prompt
