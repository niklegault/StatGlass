/// This file contains the required classes for my shot tracker app

// Goalie Class is used to store data about the goalie, will include games, name, age, and team
class Goalie {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName  = lastName;
        this._age      = age;
        this._gaa      = 0;
        this._svpc     = 0;
        this._saves    = 0;
        this._shotsVS  = 0;
        this._goalsVS  = 0;
        this._games    = []; 
    }

    // Getters
    get name() {
        return `${this.firstName} ${this.lastName}`; 
    }

    get age() {
        return this._age;
    }

    get gaa() {
        return this._gaa;
    }

    get svpc() {
        return this._svpc;
    }

    get goalsVS() {
        return this._goalsVS;
    }

    get shotsVS() {
        return this._shotsVS;
    }

    get games() {
        return this._games;
    }

    // Functions
    addGame(gameToAdd) {
        this._games.push(gameToAdd);
        for(let i = 0; i < gameToAdd.periods; i++) {
            this._shotsVS += gameToAdd.shotsVS[i];
            this._goalsVS += gameToAdd.goalsVS[i];
        }
        this._saves += this.calcSaves();
        this._svpc += this.calcSVPC();
    }

    calcSaves() {
        return this._shotsVS - this._goalsVS;
    }

    calcSVPC() {
        return this._saves / this._shotsVS;
    }
}

// Game Class is used to store data about the teams playing, the goalie, and the amount of shots, and goals per period of play
class Game {
    constructor(homeTeam, awayTeam, homeGoalie, homeBackup, periods) {
        this._homeTeam    = homeTeam;
        this._awayTeam    = awayTeam;
        this._homeGoalie  = homeGoalie;
        this._homeBackup  = homeBackup;
        this.periods      = periods;
        this._curPeriod   = 1;
        this._shotsFor    = [];
        this._shotsVS     = [];
        this._goalsFor    = [];
        this._goalsVS     = [];
        for(let i = 0; i < periods; i++) {
            this._shotsVS.push(0);
            this._shotsFor.push(0);
            this._goalsVS.push(0);
            this._goalsFor.push(0);
        }
    }

    // Getters
    get shotsFor() {
        return this._shotsFor;
    }

    get shotsVS() {
        return this._shotsVS;
    }

    get goalsFor() {
        return this._goalsFor;
    }

    get goalsVS() {
        return this._goalsVS;
    }

    // Functions
    addShotsFor() {
        this._shotsFor[this._curPeriod - 1] ++;
    }

    addShotsVS() {
        this._shotsVS[this._curPeriod - 1] ++;
    }

    addGoalsFor() {
        this._goalsFor[this._curPeriod - 1] ++;
    }

    addGoalsVS() {
        this._goalsVS[this._curPeriod - 1] ++;
    }

    incrementPeriod() {
        if(this._curPeriod < this.periods) {
            this._curPeriod ++;
        }        
    }

    decreasePeriod() {
        if(this._curPeriod > 1) {
            this._curPeriod --;
        }
    }
}

// Team Class is used to store info about games played and each goalie belonging to the team
class Team {
    constructor(name, league, sport, gameLength, periods) {
        this.name       = name;
        this.league     = league;
        this.sport      = sport;
        this.gameLength = gameLength;
        this.period     = periods;
        this.goalies    = [];
    }

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