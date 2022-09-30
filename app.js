/// This file contains the main code for the shot tracker app
// Import all classes
const classes = require("./classes")


////// TESTING \\\\\\
let knights = new classes.Team('Nepean Knights', 'U15 Lacrosse', 'Lacrosse', 45, 3)
let will = new classes.Goalie('Will', 'Legault', 13, knights)
let test = new classes.Game(knights, 'celtics', will, 3, 15);

test.addShotsAway();
test.addShotsAway();
test.incrementPeriod();
test.addGoalsAway();
test.addShotsAway();

will.addGame(test);
console.log(will.goalsVS);
