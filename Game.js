// Imports
const { Goalie } = require("./Goalie");

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
     * @param {BigInt} periods The number of periods in the game
     * @param {BigInt} periodLength The length of each period
     */
    constructor(homeTeam, awayTeam, periods, periodLength) {
        // From Arguments
        this._homeTeam     = homeTeam;
        this._awayTeam     = awayTeam;
        this.periods       = periods;
        this._periodLength = periodLength;
        
        // Stat Tracking
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
        }        
    }

    /**
     * @author Nik Legault
     * @desc Decreases the current period and time played
     */
    decreasePeriod() {
        if(this._curPeriod > 1) {
            this._curPeriod --;
        }
    }
}

/// Exporting Class
module.exports = {
    Game,
};