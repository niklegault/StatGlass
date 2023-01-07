// Imports
const { Game } = require("./Game");

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
        
        // Stats [Normal, High Danger(HD), Breakaway(BW)]
        this._gaa        = [0, 0, 0];
        this._svpc       = [0, 0, 0];
        this._saves      = [0, 0, 0];
        this._shotsVS    = [0, 0, 0];
        this._goalsVS    = [0, 0, 0];
        this._timePlayed = [0, 0, 0];
        this._games      = [];

        // For Calculations
        this._gameLength = 45;
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
        return this._gaa[0];
    }

    /**
     * @returns {Number} The goals against average of the goalie
     */
    get HDgaa() {
        return this._gaa[1];
    }

    /**
     * @returns {Number} The goals against average of the goalie
     */
    get BWgaa() {
        return this._gaa[2];
    }

    /**
     * @returns {Number} The save percentage of the goalie
     */
    get svpc() {
        return this._svpc[0];
    }


    /**
     * @returns {Number} The save percentage of the goalie
     */
    get HDsvpc() {
        return this._svpc[1];
    }

    /**
     * @returns {Number} The save percentage of the goalie
     */
    get BWsvpc() {
        return this._svpc[2];
    }

    /**
     * @returns {BigInt} The goals allowed by the goalie
     */
    get goalsVS() {
        return this._goalsVS[0];
    }

    /**
     * @returns {BigInt} The goals allowed by the goalie
     */
    get HDgoalsVS() {
        return this._goalsVS[1];
    }

    /**
     * @returns {BigInt} The goals allowed by the goalie
     */
    get BWgoalsVS() {
        return this._goalsVS[2];
    }

    /**
     * @returns {BigInt} The shots allowed by the goalie
     */
    get shotsVS() {
        return this._shotsVS[0];
    }

    /**
     * @returns {BigInt} The shots allowed by the goalie
     */
    get HDshotsVS() {
        return this._shotsVS[1];
    }

    /**
     * @returns {BigInt} The shots allowed by the goalie
     */
    get BWshotsVS() {
        return this._shotsVS[2];
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
            this._shotsVS[0] += gameToAdd.shotsVS[i];  
            this._shotsVS[1] += gameToAdd.HDshotsVS[i];
            this._shotsVS[2] += gameToAdd.BWshotsVS[i];
            this._goalsVS[0] += gameToAdd.goalsVS[i];
            this._goalsVS[1] += gameToAdd.HDgoalsVS[i];
            this._goalsVS[2] += gameToAdd.BWgoalsVS[i];
        }
        this._saves = this.calcSaves();
        this._svpc = this.calcSVPC();
        this._gaa = this.calcGAA();
    }

    /**
     * @author Nik Legault
     * @returns {BigInt[]} The amount of saves[normal, HD, BW] a goalie made
     */
    calcSaves() {
        return this._shotsVS.map((n, i) => n - this._goalsVS[i]);
    }

    /**
     * @author Nik Legault
     * @returns {Number[]} The save percentage[normal, HD, BW] of the goalie
     */
    calcSVPC() {
        return this._saves.map((n, i) => n / this._shotsVS[i]);
    }

    /**
     * @author Nik Legault
     * @returns {Number[]} The goals against average [normal, HD, BW] of the goalie
     */
    calcGAA() {
        return this._goalsVS.map((n, i) => n * this._gameLength[i] / this._timePlayed);
    }
}

/// Exporting class
module.exports = {
    Goalie,
};