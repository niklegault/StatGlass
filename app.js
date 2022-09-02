/// This file contains the main code for the shot tracker app
// Import all classes
const classes = require("./classes")


////// TESTING \\\\\\
let will = new classes.Goalie('Will', 'Legault', 13)
let test = new classes.Game('knights', 'celtics', will, 3);

test.addShotsVS();
test.addShotsVS();
test.incrementPeriod();
test.addGoalsVS();
test.addShotsVS();

will.addGame(test);
console.log(will.goalsVS);
