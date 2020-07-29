const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//link to questions folder which the functions call
const questions = require("./lib/questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//render file established here which is later used
const render = require("./lib/htmlRenderer");
//
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

//function prompts user which passes through the other functions depending on the user response
function promptQuesitons() {
  inquirer
    .prompt(questions.promptRole)
    .then(function (reply) {
      //switch case which took role of if statements, runs through function depending on user input
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
//this function builds the managers profile
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
//this function builds intern profile
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
//this funciton builds engineer profile
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

//init to run questions (which are in the questions folder)
function init() {
  promptQuesitons();
}
init();
//ASYNC the runs function
//this renders the file sending files to generate html
async function renderFiles() {
  try {
    const userAnswers = await render(teamArray);
    writeFileAsync(outputPath, userAnswers);
  } catch (err) {
    console.log(err);
  }
}
