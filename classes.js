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
     * @param {String} team The team the goalie is a member of
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
     * @param {String} homeTeam The home team of the game
     * @param {String} awayTeam The visiting team of the game
     * @param {Goalie} homeGoalie The home team's goalie
     * @param {Goalie} awayGoalie The away team's goalie
     * @param {BigInt} periods The number of periods in the game
     * @param {BigInt} periodLength The length of each period
     */
    constructor(homeTeam, awayTeam, homeGoalie, awayGoalie, periods, periodLength) {
        // From Arguments
        this._homeTeam     = homeTeam;
        this._awayTeam     = awayTeam;
        this._homeGoalie   = homeGoalie;
        this._awayGoalie   = awayGoalie;
        this.periods       = periods;
        this._periodLength = periodLength;
        
        // Stat Tracking

        this._timePlayed   = 0;
        
        
        this._curPeriod    = 1;
        this._shotsHome    = [];
        this._shotsAway    = [];
        this._goalsHome    = [];
        this._goalsAway    = [];
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
     * @desc Decrements the away team's shots of the current period by 1
     */
     removeShotsAway() {
        this._shotsAway[this._curPeriod - 1] --;
    }

    /**
     * @author Nik Legault
     * @desc Decrements the home team's shots of the current period by 1
     */
    removeShotsHome() {
        this._shotsHome[this._curPeriod - 1] --;
    }
    
    /**
     * @author Nik Legault
     * @desc Decrements the away team's goals of the current period by 1
     */
    removeGoalsAway() {
        this._goalsAway[this._curPeriod - 1] --;
    }

    /**
     * @author Nik Legault
     * @desc Decrements the home team's goals of the current period by 1
     */
    removeGoalsHome() {
        this._goalsHome[this._curPeriod - 1] --;
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
}



/// Exporting classes
module.exports = {
    Goalie,
    Game,
};