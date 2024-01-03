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
     * Add a game to the goalie's record of played games
     *
     * @param {Game} gameToAdd The game the goalie played
     */
    addGame(gameToAdd) {
        this.gamesPlayed++;
        this.games.push(gameToAdd);
        this.seasons[gameToAdd.season].push(gameToAdd);
        if(gameToAdd.amHome) { // Check if home or away
            if(gameToAdd.isStarter) { // Check if goalie is the starter for their team
                this.record[gameToAdd.result]++;
                this.timePlayed += gameToAdd.timePlayedHome[Game.STARTER];
                for(let i = 0; i < gameToAdd.periods; i++) {
                    this.shots[Goalie.NM] = gameToAdd.shotsAwayStarter[Goalie.NM][i];
                    this.shots[Goalie.HD] = gameToAdd.shotsAwayStarter[Goalie.HD][i];
                    this.shots[Goalie.BW] = gameToAdd.shotsAwayStarter[Goalie.BW][i];
                    this.goals[Goalie.NM] = gameToAdd.goalsAwayStarter[Goalie.NM][i];
                    this.goals[Goalie.HD] = gameToAdd.goalsAwayStarter[Goalie.HD][i];
                    this.goals[Goalie.BW] = gameToAdd.goalsAwayStarter[Goalie.BW][i];
                }
            } else {
                if(gameToAdd.timePlayedHome[Game.BACKUP] > gameToAdd.periodLength) {
                    this.record[gameToAdd.result]++;
                }
                this.timePlayed += gameToAdd.timePlayedHome[Game.BACKUP];
                for(let i = 0; i < gameToAdd.periods; i++) {
                    this.shots[Goalie.NM] = gameToAdd.shotsAwayBackup[Goalie.NM][i];
                    this.shots[Goalie.HD] = gameToAdd.shotsAwayBackup[Goalie.HD][i];
                    this.shots[Goalie.BW] = gameToAdd.shotsAwayBackup[Goalie.BW][i];
                    this.goals[Goalie.NM] = gameToAdd.goalsAwayBackup[Goalie.NM][i];
                    this.goals[Goalie.HD] = gameToAdd.goalsAwayBackup[Goalie.HD][i];
                    this.goals[Goalie.BW] = gameToAdd.goalsAwayBackup[Goalie.BW][i];
                }
            }
        } else { // Goalie's team is the away team
            if(gameToAdd.isStarter) { // Check if goalie is the starter for their team
                this.record[gameToAdd.result]++;
                this.timePlayed += gameToAdd.timePlayedAway[Game.STARTER];
                for(let i = 0; i < gameToAdd.periods; i++) {
                    this.shots[Goalie.NM] = gameToAdd.shotsHomeStarter[Goalie.NM][i];
                    this.shots[Goalie.HD] = gameToAdd.shotsHomeStarter[Goalie.HD][i];
                    this.shots[Goalie.BW] = gameToAdd.shotsHomeStarter[Goalie.BW][i];
                    this.goals[Goalie.NM] = gameToAdd.goalsHomeStarter[Goalie.NM][i];
                    this.goals[Goalie.HD] = gameToAdd.goalsHomeStarter[Goalie.HD][i];
                    this.goals[Goalie.BW] = gameToAdd.goalsHomeStarter[Goalie.BW][i];
                }
            } else {
                if(gameToAdd.timePlayedAway[Game.BACKUP] > gameToAdd.periodLength) {
                    this.record[gameToAdd.result]++;
                }
                this.timePlayed += gameToAdd.timePlayedAway[Game.BACKUP];
                for(let i = 0; i < gameToAdd.periods; i++) {
                    this.shots[Goalie.NM] = gameToAdd.shotsHomeBackup[Goalie.NM][i];
                    this.shots[Goalie.HD] = gameToAdd.shotsHomeBackup[Goalie.HD][i];
                    this.shots[Goalie.BW] = gameToAdd.shotsHomeBackup[Goalie.BW][i];
                    this.goals[Goalie.NM] = gameToAdd.goalsHomeBackup[Goalie.NM][i];
                    this.goals[Goalie.HD] = gameToAdd.goalsHomeBackup[Goalie.HD][i];
                    this.goals[Goalie.BW] = gameToAdd.goalsHomeBackup[Goalie.BW][i];
                }
            }
        }
        this.saves = this.calcSaves();
        this.svpc = this.calcSVPC();
        this.gaa = this.calcGAA();
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