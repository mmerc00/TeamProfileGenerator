const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const jest = require ("jest");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);
//empty team array
let teamArray = [];
//let employeeId = 0;
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//HELPER FUNCTIONS FOR THE ADD TEAM MEMBER =====
function newTeamMember(reply) {
  return inquirer
  .prompt([
    {type: "confirm",
    message:"would you like to add a team member",
    name: "member",
  }])
  .then(function(yes){
    if(yes.member === true){
      promptQuestion();
    } else {
renderFiles();
    }
  })
  .catch(function(err) {
    console.log(err);
    })
}

//function user prompt questions
//made a function instead of a const


function UserPrompt(response) {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "what is your job title",
        choices: ["Engineer", "Intern", "manager"],
        name: "role",
      },
    ])
    //await async
    //instead of await change order 
    .then(function (reply) {
      if (reply.role === "Manager") {
     inquirer.prompt([
        {
        type: "input",
        message: "what is your managers name?",
        name: "name",
          },{
        type: "input",
        message: "what is your managers id",
        name: "id",
        },{
        type: "input",
        message: "what is your managers email",
        name: "email",
          }, {
        type: "input",
        message: "what is your managers office number",
        name: "officeNumber",
        //   } , {
        // type: "input",
        // message: "what type of team memeber would you like to add",
        // name: "type",
          }])
        //.then gathers the information above
          .then(function (managerReply) {
              //making a new object
            let newmanager = new Manager(
             managerReply.name,
             managerRely.id,
             managerReply.email,
             managerReply.officeNumber,
             //managerReply.type,
             //assigning employee id and adding it by input
            //pushing into an array
            teamArray.push(newManager));
            //run new team member function (this confuses me)
             newTeamMember()
          })}
      else if (reply.role === "Intern") {
        inquirer
        .prompt([
        {
        type: "input",
        message: "what is you interns name?",
        name: "name",
        },{
        type: "input",
        message: "what is you interns id?",
        name: "id",
        },{
        type: "input",
        message: "what is your interns email",
        name: "email",
        },{
        type: "input",
        message: "what is your interns education",
         name: "education",
        // }, {
        // type: "input",
        // message: "which type of team member would you like to add",
        // name: "type",
         }])
            .then(function(internReply){
               let newInter = new Intern (
                internReply.name,
                internReply.email,
                internReply.education,
                //internReply.type,
               
            );
            //assigning employee id and adding it by input
            teamArray.push(newIntern);
            newTeamMember();
                    });}

    else if (reply.role === "Engineer") {
            inquirer.prompt([
        {
        type: "input",
        message: "what is your engineers name",
        name: "name",
        },{
        type: "input",
        message: "what is your engineers id?",
        name: "id",
        }, {
        type: "input",
        message: "what is your engineers id",
        name: "email",
        },{
        type: "input",
        message: "what is your engineers Github username",
        name: "github",
        },{
        // type: "input",
        // message: "which type of team member would you like to add",
        // name: "type",
            }])
    .then(function (engineerReply) {
        let newEngineer = new Engineer(
        engineerReply.name,
        engineerReply.id,
        engineerReply.email,
        engineerReply.github,
        // engineerReply.type,
        );
        teamArray.push(newEngineer);
        newTeamMember();
    });
  
    })
    .catch(function (err) {
      console.log(err);
    })}
          
//working on this
//new team memeber function
// function newTeamMember(reply) {

// generate html here

function init (){
  promptQuesitons();
}
init();

async function renderFiles(){
  try {
    const userAnswers = await render(teamArray);
    writeFileAsync(outpath, userAnswers)
    .catch (err);
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
