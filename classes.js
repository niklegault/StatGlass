/// This file contains the required classes for my shot tracker app

// Goalie Class is used to store data about the goalie, will include games, name, age, and team
class Goalie {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName  = lastName;
        this._age      = age;
        this._gaa      = 0;
        this._svpc     = 0;
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

    // Setters
    

    // Functions
    addGame(gameToAdd) {
        this.games.push(gameToAdd);

    }

    
}

// Game Class is used to store data about the teams playing, the goalie (can be both teams), and the amount of shots, and goals per period of play
class Game {
    constructor(homeTeam, awayTeam, homeGoalie, homeBackup, awayGoalie, awayBackup) {
        this.homeTeam    = homeTeam;
        this.awayTeam    = awayTeam;
        this.homeGoalie  = homeGoalie;
        this.homeBackup  = homeBackup;
        this.awayGoalie  = awayGoalie;
        this.awayBackup  = awayBackup;
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