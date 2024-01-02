// Imports
const { Game } = require("./Game");

/**
 * Represents a goalie, holding information about games, saves, goals allowed,
 * and other more advanced stats
 *
 * @class
 * @author Nik Legault
 * @version 0.0.1
 */
class Goalie {
    // Constants
    // Note that NM includes HD which includes BW
    static NM = 0; // For normal shots/goals
    static HD = 1; // For high danger shots/goals
    static BW = 2; // For breakaway shots/goals
    static WIN = 0; // Used for editing record
    static LOSS = 1; // Used for editing record
    static TIE = 2; // Used for editing record

    /**
     * Creates a new Goalie object with the name, age, team, and sport information
     * provided
     *
     * @constructor
     * @param {String} firstName First name of the goalie
     * @param {String} lastName Last name of the goalie
     * @param {Number} age Age of the goalie
     * @param {String} team Team the goalie is a member of
     * @param {Number} gameLength Length of the games
     * @param {String} sport Sport being played
     * @param {Number} periods Number of periods per game
     */
    constructor(firstName, lastName, age, team, gameLength, sport, periods) {
        // Goalie Information
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.team = team;
        this.gameLength = gameLength;
        this.sport = sport;
        this.periods = periods;

        // Stat Tracking
        this.record = [0, 0, 0]; // Record of the goalie [WIN, LOSS, TIE]
        this.gamesPlayed = 0;
        this.svpc = [0, 0, 0]; // Save percentage of the goalie [NM, HD, BW]
        this.saves = [0, 0, 0]; // Saves for the goalie [NM, HD, BW]
        this.gaa = [0, 0, 0]; // Goals against average of the goalie [NM, HD, BW]
        this.shots = [0, 0, 0]; // Shots against for the goalie [NM, HD, BW]
        this.goals = [0, 0, 0]; // Goals against for the goalie [NM, HD, BW]
        this.timePlayed = 0;
        this.games = [];
        this.seasons = {}; // Store seasons to view stats separately (season: key, games[]: val)
    }

    // Functions
    /**
     * Create a new season in the goalie's season collection
     *
     * @param {String} seasonName The name of the season to add
     */
    newSeason(seasonName) {
        if(!(seasonName in this.seasons)) {
            this.seasons[seasonName] = [];
        }
    }

    /**
     * @TODO
     * Update once Game is fully implemented
     *
     * @param gameToAdd
     */
    addGame(gameToAdd) {

    }

    /**
     * Calculate the number of saves the goalie has made
     *
     * @returns {BigInt[]} Number of saves the goalie has made [NM, HD, BW]
     */
    calcSaves() {
        return this.shots.map((n, i) => n - this.goals[i]);
    }

    /**
     * Calculate the save percentage of the goalie
     *
     * @returns {Number[]} Save percentage of the goalie [NM, HD, BW]
     */
    calcSVPC() {
        let pc = this.saves.map((n, i) => n / this.shots[i]);
        if(isNaN(pc[Goalie.NM])) {
            pc[Goalie.NM] = 0;
        }
        if(isNaN(pc[Goalie.HD])) {
            pc[Goalie.HD] = 0;
        }
        if(isNaN(pc[Goalie.BW])) {
            pc[Goalie.BW] = 0;
        }
        return pc;
    }

    /**
     * Calculate the GAA of the goalie
     *
     * @returns {Number[]} Goals against average of the goalie [NM, HD, BW]
     */
    calcGAA() {
        return this.goals.map((n) => (n * this.gameLength) / this.timePlayed);
    }
}

// Export Class
module.exports = {
    Goalie,
};