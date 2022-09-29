/// This file contains the required classes for my shot tracker app

/**
 * @author Nik Legault
 * @class
 * @classdesc The goalie class is used to store data about the goalie, including games, name, age, and team among other stats
 */
class Goalie {
    /**
     * @author Nik Legault
     * @constructor Creates a new instance of the goalie class
     * @param {String} firstName The first name of the goalie
     * @param {String} lastName The last name of the goalie
     * @param {BigInt} age The age of the goalie
     * @param {Team} team The team the goalie is a member of
     */
    constructor(firstName, lastName, age, team) {
        // From Arguments
        this.firstName   = firstName;
        this.lastName    = lastName;
        this._team       = team;
        this._age        = age;
        
        // Stats
        this._gaa        = 0;
        this._svpc       = 0;
        this._saves      = 0;
        this._shotsVS    = 0;
        this._goalsVS    = 0;
        this._timePlayed = 0;
        this._games      = [];

        // For Calculations
        this._gameLength = team.gameLength;
    }

    // Getters
    /**
     * @returns {String} The first and last name combined into one string
     */
    get name() {
        return `${this.firstName} ${this.lastName}`; 
    }

    /**
     * @returns {Team} The team the goalie plays for
     */
    get team() {
        return this._team;
    }

    /**
     * @returns {BigInt} Age of the goalie
     */
    get age() {
        return this._age;
    }

    /**
     * @returns {Number} The goals against average of the goalie
     */
    get gaa() {
        return this._gaa;
    }

    /**
     * @returns {Number} The save percentage of the goalie
     */
    get svpc() {
        return this._svpc;
    }

    /**
     * @returns {BigInt} The goals allowed by the goalie
     */
    get goalsVS() {
        return this._goalsVS;
    }

    /**
     * @returns {BigInt} The shots allowed by the goalie
     */
    get shotsVS() {
        return this._shotsVS;
    }

    /**
     * @returns {[Game]} The games played by the goalie
     */
    get games() {
        return this._games;
    }

    // Functions
    /**
     * @author Nik Legault
     * @desc Updates the goalie's stats
     * @param {Game} gameToAdd The game that you want to add to the goalie
     */
    addGame(gameToAdd) {
        this._games.push(gameToAdd);
        for(let i = 0; i < gameToAdd.periods; i++) {
            this._shotsVS += gameToAdd.shotsVS[i]; /// Needs refactoring
            this._goalsVS += gameToAdd.goalsHome[i]; /// Needs refactoring
        }
        this._saves += this.calcSaves();
        this._svpc += this.calcSVPC();
    }

    /**
     * @author Nik Legault
     * @returns {BigInt} The amount of saves a goalie made
     */
    calcSaves() {
        return this._shotsVS - this._goalsVS;
    }

    /**
     * @author Nik Legault
     * @returns {Number} The save percentage of the goalie
     */
    calcSVPC() {
        return this._saves / this._shotsVS;
    }

    /**
     * @author Nik Legault
     * @returns {Number} The goals against average of the goalie
     */
    calcGAA() {
        return this._goalsVS * this._gameLength / this._timePlayed;
    }
}

/**
 * @author Nik Legault
 * @class 
 * @classdesc The game class is used to store data about the teams playing, the goalie, and the amount of shots, and goals per period of play
 */
class Game {
    /**
     * @author Nik Legault
     * @constructor Creates an instance of the game class
     * @param {Team} homeTeam The home team of the game
     * @param {Team} awayTeam The visiting team of the game
     * @param {Goalie} homeGoalie The home team's goalie
     * @param {Goalie} awayGoalie The away team's goalie
     * @param {BigInt} periods The number of periods in the game
     * @param {BigInt} periodLength The length of each period
     */
    constructor(homeTeam, awayTeam, homeGoalie, awayGoalie, periods, periodLength) {
        /// From Arguments
        this._homeTeam     = homeTeam;
        this._awayTeam     = awayTeam;
        this._homeGoalie   = homeGoalie;
        this._awayGoalie   = awayGoalie;
        this.periods       = periods;
        this._periodLength = periodLength;
        
        /// Stat Tracking
        // GAA
        this._timePlayed           = 0;
        this._homeGoalieTimePulled = 0; // Use to subtract Goalie's time played by this amount
        this._awayGoalieTimePulled = 0; // ^
        this._homeGoalieTimePlayed = 0; // Will be equal to _timePlayed - _homeGoalieTimePulled
        this._awayGoalieTimePlayed = 0; // ^
        
        // SV%
        this._shotsHome    = [];
        this._shotsAway    = [];
        this._goalsHome    = [];
        this._goalsAway    = [];

        this._curPeriod    = 1;
        for(let i = 0; i < periods; i++) {
            this._shotsHome.push(0);
            this._shotsAway.push(0);
            this._goalsHome.push(0);
            this._goalsAway.push(0);
        }
    }

    // Getters
    /**
     * @returns {[BigInt]} The amount of shots the away team made
     */
    get shotsAway() {
        return this._shotsAway;
    }

    /**
     * @returns {[BigInt]} The amount of shots the home team made
     */
    get shotsHome() {
        return this._shotsHome;
    }

    /**
     * @returns {[BigInt]} The amount of goals the away team scored
     */
    get goalsAway() {
        return this._goalsAway;
    }

    /**
     * @returns {[BigInt]} The amount of goals the home team scored
     */
    get goalsHome() {
        return this._goalsHome;
    }

    // Functions
    /**
     * @author Nik Legault
     * @desc Increments the away team's shots of the current period by 1
     */
    addShotsAway() {
        this._shotsAway[this._curPeriod - 1] ++;
    }

    /**
     * @author Nik Legault
     * @desc Increments the home team's shots of the current period by 1
     */
    addShotsHome() {
        this._shotsHome[this._curPeriod - 1] ++;
    }
    
    /**
     * @author Nik Legault
     * @desc Increments the away team's goals of the current period by 1
     */
    addGoalsAway() {
        this._goalsAway[this._curPeriod - 1] ++;
    }

    /**
     * @author Nik Legault
     * @desc Increments the home team's goals of the current period by 1
     */
    addGoalsHome() {
        this._goalsHome[this._curPeriod - 1] ++;
    }

    /**
     * @author Nik Legault
     * @desc Increments the period and the time played
     */
    incrementPeriod() {
        if(this._curPeriod < this.periods) {
            this._curPeriod ++;
            this._timePlayed += this._periodLength;
        }        
    }

    /**
     * @author Nik Legault
     * @desc Decreases the current period and time played
     */
    decreasePeriod() {
        if(this._curPeriod > 1) {
            this._curPeriod --;
            this._timePlayed -= this._periodLength;
        }
    }

    /////// Need to add feature
    /**
     * @author Nik Legault
     * @desc Used when the goalie is not playing to adjust the time played of the goalie
     * @param {BigInt} timeOut The time in whole minutes (round up) that the goalie was pulled
     * @param {Team} team The team for which to pull the goalie 
     */
    pullGoalie(timeOut, team) {
        
    }

    /**
     * @author Nik Legault
     * @desc Used to return the goalie into play and restart tracking of time played
     * @param {BigInt} timeIn The time in whole minutest (round up) that the goalie was returned
     * @param {Team} team The team for which to return the goalie
     */
    returnGoalie(timeIn, team) {

    }
}

/**
 * @author Nik Legault
 * @class
 * @classdesc The team class is used to store info about games played, and each goalie belonging to the team
 */
class Team {
    /**
     * @author Nik Legault
     * @constructor Creates a new instance of the team class
     * @param {String} name The name of the team
     * @param {String} league The league the team plays in
     * @param {String} sport The sport the team plays
     * @param {BigInt} gameLength The amount of minutes a game takes to play
     * @param {BigInt} periods The amount of periods in a game
     */
    constructor(name, league, sport, gameLength, periods) {
        this._name       = name;
        this._league     = league;
        this._sport      = sport;
        this._gameLength = gameLength;
        this._period     = periods;
        this._goalies    = [];
        this._games      = [];
    }

    // Getters
    /**
     * @returns {BigInt} The amoung of minutes a game takes to play
     */
    get gameLength() {
        return this._gameLength;
    }

    // Functions
    /**
     * @author Nik Legault
     * @desc Adds a goalie to the list of the team's goalies
     * @param {Goalie} goalieToAdd The goalie that is to be added to the team
     */
    addGoalie(goalieToAdd) {
        this.goalies.push(goalieToAdd);
    }
}

/// Exporting classes
module.exports = {
    Goalie,
    Game,
    Team
};