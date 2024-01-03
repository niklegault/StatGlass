
/**
 * Represents a game, holds information about the 2 teams competing, such as:
 * goals and shots (includes normal, high-danger, and breakaway)
 *
 * @class
 * @author Nik Legault
 * @version 0.0.1
 */
class Game {
    /// Constants
    // Note: NM includes HD which includes BW
    static NM = 0; // For normal shots/goals
    static HD = 1; // For high danger shots/goals
    static BW = 2; // For breakaway shots/goals
    // Track the goalie in the net
    static STARTER = 0;
    static BACKUP = 1;
    static EMPTY = 2;

    /**
     * Create a new Game object with the given home and away teams,
     *
     * @param {String} homeTeam Name of the home team
     * @param {String} awayTeam Name of the away team
     * @param {boolean} amHome True if goalie's team is the home team
     * @param {boolean} isStarter True if goalie is starting
     * @param {Number} periods Number of periods in the game
     * @param {Number} periodLength Length of each period
     * @param {String} season Season of the game
     */
    constructor(homeTeam, awayTeam, amHome, isStarter, periods, periodLength, season) {
        /// Game information
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.amHome = amHome;
        this.isStarter = isStarter;
        this.getsResult = isStarter; // if true, game result can be added to record of goalie
        this.periods = periods;
        this.periodLength = periodLength;
        this.season = season;

        /// Stat Tracking
        this.curPeriod = 1;
        this.result = "";

        /// Home (stats are shots for/goals for, but ga, svpc, and gaa are of that teams goalie) [NM, HD, BW]
        // Each internal array will have values for each period
        this.shotsHome = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsHome = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesHome = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaHome = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcHome = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaHome = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.curGoalieHome = Game.STARTER;
        this.pulledGoalieHome = Game.EMPTY;
        this.timePlayedHome = Array(3).fill(0); // [STARTER, BACKUP, EMPTY]
        this.timePlayedHome[Game.STARTER] = this.periodLength; // Initial time played

        // Home Starter (Shots vs. away team starter goalie)
        this.shotsHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));

        // Home Backup (Shots vs. away team backup goalie)
        this.shotsHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));

        /// Away (stats are shots for/goals for, but ga, svpc, and gaa are of that teams goalie) [NM, HD, BW]
        // Each internal array will have values for each period
        this.shotsAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.curGoalieAway = Game.STARTER;
        this.pulledGoalieAway = Game.EMPTY;
        this.timePlayedAway = Array(3).fill(0); // [STARTER, BACKUP, EMPTY]
        this.timePlayedAway[Game.STARTER] = this.periodLength; // Initial time played

        // Away Starter (Shots vs. home team starter goalie)
        this.shotsAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));

        // Away Backup (Shots vs. home team backup goalie)
        this.shotsAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
    }

    /// Functions
    /**
     * Calculate the result of the game and set this.result to the result
     */
    determineResult() {
        let totalHome = 0;
        let totalAway = 0;
        for(let i = 0; i < this.periods; i++) {
            totalHome += this.goalsHome[Game.NM][i];
            totalAway += this.goalsAway[Game.NM][i];
        }
        if(this.amHome) {
            if(totalHome > totalAway) {
                this.result += "W";
            } else if(totalHome < totalAway) {
                this.result += "L";
            } else {
                this.result += "T";
            }
        } else {
            if(totalAway > totalHome) {
                this.result += "W";
            } else if(totalAway < totalHome) {
                this.result += "L";
            } else {
                this.result += "T";
            }
        }
    }

    /// Home Shots
    /**
     * Increment the home team's NM shots for the corresponding goalie (Starter/Backup)
     */
    addShotHome() {
        this.shotsHome[Game.NM][this.curPeriod]++;
        if(this.curGoalieAway === Game.STARTER) {
            this.shotsHomeStarter[Game.NM][this.curPeriod]++;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.shotsHomeBackup[Game.NM][this.curPeriod]++;
        }
    }

    /**
     * Increment the home team's HD and NM shots for the corresponding goalie (Starter/Backup)
     */
    addHDShotHome() {
        this.shotsHome[Game.NM][this.curPeriod]++;
        this.shotsHome[Game.HD][this.curPeriod]++;
        if(this.curGoalieAway === Game.STARTER) {
            this.shotsHomeStarter[Game.NM][this.curPeriod]++;
            this.shotsHomeStarter[Game.HD][this.curPeriod]++;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.shotsHomeBackup[Game.NM][this.curPeriod]++;
            this.shotsHomeBackup[Game.HD][this.curPeriod]++;
        }
    }

    /**
     * Increment the home team's BW, HD, and NM shots for the corresponding goalie (Starter/Backup)
     */
    addBWShotHome() {
        this.shotsHome[Game.NM][this.curPeriod]++;
        this.shotsHome[Game.HD][this.curPeriod]++;
        this.shotsHome[Game.BW][this.curPeriod]++;
        if(this.curGoalieAway === Game.STARTER) {
            this.shotsHomeStarter[Game.NM][this.curPeriod]++;
            this.shotsHomeStarter[Game.HD][this.curPeriod]++;
            this.shotsHomeStarter[Game.BW][this.curPeriod]++;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.shotsHomeBackup[Game.NM][this.curPeriod]++;
            this.shotsHomeBackup[Game.HD][this.curPeriod]++;
            this.shotsHomeBackup[Game.BW][this.curPeriod]++;
        }
    }

    /**
     * Decrement the home team's NM shots for the corresponding goalie (Starter/Backup)
     */
    removeShotHome() {
        this.shotsHome[Game.NM][this.curPeriod]--;
        if(this.curGoalieAway === Game.STARTER) {
            this.shotsHomeStarter[Game.NM][this.curPeriod]--;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.shotsHomeBackup[Game.NM][this.curPeriod]--;
        }
    }

    /**
     * Decrement the home team's HD and NM shots for the corresponding goalie (Starter/Backup)
     */
    removeHDShotHome() {
        this.shotsHome[Game.NM][this.curPeriod]--;
        this.shotsHome[Game.HD][this.curPeriod]--;
        if(this.curGoalieAway === Game.STARTER) {
            this.shotsHomeStarter[Game.NM][this.curPeriod]--;
            this.shotsHomeStarter[Game.HD][this.curPeriod]--;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.shotsHomeBackup[Game.NM][this.curPeriod]--;
            this.shotsHomeBackup[Game.HD][this.curPeriod]--;
        }
    }

    /**
     * Decrement the home team's BW, HD, and NM shots for the corresponding goalie (Starter/Backup)
     */
    removeBWShotHome() {
        this.shotsHome[Game.NM][this.curPeriod]--;
        this.shotsHome[Game.HD][this.curPeriod]--;
        this.shotsHome[Game.BW][this.curPeriod]--;
        if(this.curGoalieAway === Game.STARTER) {
            this.shotsHomeStarter[Game.NM][this.curPeriod]--;
            this.shotsHomeStarter[Game.HD][this.curPeriod]--;
            this.shotsHomeStarter[Game.BW][this.curPeriod]--;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.shotsHomeBackup[Game.NM][this.curPeriod]--;
            this.shotsHomeBackup[Game.HD][this.curPeriod]--;
            this.shotsHomeBackup[Game.BW][this.curPeriod]--;
        }
    }

    /// Away Shots
    /**
     * Increment the Away team's NM shots for the corresponding goalie (Starter/Backup)
     */
    addShotAway() {
        this.shotsAway[Game.NM][this.curPeriod]++;
        if(this.curGoalieHome === Game.STARTER) {
            this.shotsAwayStarter[Game.NM][this.curPeriod]++;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.shotsAwayBackup[Game.NM][this.curPeriod]++;
        }
    }

    /**
     * Increment the Away team's HD and NM shots for the corresponding goalie (Starter/Backup)
     */
    addHDShotAway() {
        this.shotsAway[Game.NM][this.curPeriod]++;
        this.shotsAway[Game.HD][this.curPeriod]++;
        if(this.curGoalieHome === Game.STARTER) {
            this.shotsAwayStarter[Game.NM][this.curPeriod]++;
            this.shotsAwayStarter[Game.HD][this.curPeriod]++;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.shotsAwayBackup[Game.NM][this.curPeriod]++;
            this.shotsAwayBackup[Game.HD][this.curPeriod]++;
        }
    }

    /**
     * Increment the Away team's BW, HD, and NM shots for the corresponding goalie (Starter/Backup)
     */
    addBWShotAway() {
        this.shotsAway[Game.NM][this.curPeriod]++;
        this.shotsAway[Game.HD][this.curPeriod]++;
        this.shotsAway[Game.BW][this.curPeriod]++;
        if(this.curGoalieHome === Game.STARTER) {
            this.shotsAwayStarter[Game.NM][this.curPeriod]++;
            this.shotsAwayStarter[Game.HD][this.curPeriod]++;
            this.shotsAwayStarter[Game.BW][this.curPeriod]++;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.shotsAwayBackup[Game.NM][this.curPeriod]++;
            this.shotsAwayBackup[Game.HD][this.curPeriod]++;
            this.shotsAwayBackup[Game.BW][this.curPeriod]++;
        }
    }

    /**
     * Decrement the Away team's NM shots for the corresponding goalie (Starter/Backup)
     */
    removeShotAway() {
        this.shotsAway[Game.NM][this.curPeriod]--;
        if(this.curGoalieHome === Game.STARTER) {
            this.shotsAwayStarter[Game.NM][this.curPeriod]--;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.shotsAwayBackup[Game.NM][this.curPeriod]++;
        }
    }

    /**
     * Decrement the Away team's HD and NM shots for the corresponding goalie (Starter/Backup)
     */
    removeHDShotAway() {
        this.shotsAway[Game.NM][this.curPeriod]--;
        this.shotsAway[Game.HD][this.curPeriod]--;
        if(this.curGoalieHome === Game.STARTER) {
            this.shotsAwayStarter[Game.NM][this.curPeriod]--;
            this.shotsAwayStarter[Game.HD][this.curPeriod]--;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.shotsAwayBackup[Game.NM][this.curPeriod]--;
            this.shotsAwayBackup[Game.HD][this.curPeriod]--;
        }
    }

    /**
     * Decrement the Away team's BW, HD, and NM shots for the corresponding goalie (Starter/Backup)
     */
    removeBWShotAway() {
        this.shotsAway[Game.NM][this.curPeriod]--;
        this.shotsAway[Game.HD][this.curPeriod]--;
        this.shotsAway[Game.BW][this.curPeriod]--;
        if(this.curGoalieHome === Game.STARTER) {
            this.shotsAwayStarter[Game.NM][this.curPeriod]--;
            this.shotsAwayStarter[Game.HD][this.curPeriod]--;
            this.shotsAwayStarter[Game.BW][this.curPeriod]--;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.shotsAwayBackup[Game.NM][this.curPeriod]--;
            this.shotsAwayBackup[Game.HD][this.curPeriod]--;
            this.shotsAwayBackup[Game.BW][this.curPeriod]--;
        }
    }

    /// Home Goals
    /**
     * Increment the Home team's NM goals for the corresponding goalie (Starter/Backup)
     */
    addGoalHome() {
        this.addShotHome();
        this.goalsHome[Game.NM][this.curPeriod]++;
        if(this.curGoalieAway === Game.STARTER) {
            this.goalsHomeStarter[Game.NM][this.curPeriod]++;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.goalsHomeBackup[Game.NM][this.curPeriod]++;
        }
    }

    /**
     * Increment the Home team's HD and NM goals for the corresponding goalie (Starter/Backup)
     */
    addHDGoalHome() {
        this.addHDShotHome();
        this.goalsHome[Game.NM][this.curPeriod]++;
        this.goalsHome[Game.HD][this.curPeriod]++;
        if(this.curGoalieAway === Game.STARTER) {
            this.goalsHomeStarter[Game.NM][this.curPeriod]++;
            this.goalsHomeStarter[Game.HD][this.curPeriod]++;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.goalsHomeBackup[Game.NM][this.curPeriod]++;
            this.goalsHomeBackup[Game.HD][this.curPeriod]++;
        }
    }

    /**
     * Increment the Home team's BW, HD, and NM goals for the corresponding goalie (Starter/Backup)
     */
    addBWGoalHome() {
        this.addBWShotHome();
        this.goalsHome[Game.NM][this.curPeriod]++;
        this.goalsHome[Game.HD][this.curPeriod]++;
        this.goalsHome[Game.NM][this.curPeriod]++;
        if(this.curGoalieAway === Game.STARTER) {
            this.goalsHomeStarter[Game.NM][this.curPeriod]++;
            this.goalsHomeStarter[Game.HD][this.curPeriod]++;
            this.goalsHomeStarter[Game.BW][this.curPeriod]++;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.goalsHomeBackup[Game.NM][this.curPeriod]++;
            this.goalsHomeBackup[Game.HD][this.curPeriod]++;
            this.goalsHomeBackup[Game.BW][this.curPeriod]++;
        }
    }

    /**
     * Decrement the Home team's NM goals for the corresponding goalie (Starter/Backup)
     */
    removeGoalHome() {
        this.removeShotHome();
        this.goalsHome[Game.NM][this.curPeriod]--;
        if(this.curGoalieAway === Game.STARTER) {
            this.goalsHomeStarter[Game.NM][this.curPeriod]--;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.goalsHomeBackup[Game.NM][this.curPeriod]--;
        }
    }

    /**
     * Decrement the Home team's HD and NM goals for the corresponding goalie (Starter/Backup)
     */
    removeHDGoalHome() {
        this.removeHDShotHome();
        this.goalsHome[Game.NM][this.curPeriod]--;
        this.goalsHome[Game.HD][this.curPeriod]--;
        if(this.curGoalieAway === Game.STARTER) {
            this.goalsHomeStarter[Game.NM][this.curPeriod]--;
            this.goalsHomeStarter[Game.HD][this.curPeriod]--;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.goalsHomeBackup[Game.NM][this.curPeriod]--;
            this.goalsHomeBackup[Game.HD][this.curPeriod]--;
        }
    }

    /**
     * Decrement the Home team's BW, HD, and NM goals for the corresponding goalie (Starter/Backup)
     */
    removeBWGoalHome() {
        this.removeBWShotHome();
        this.goalsHome[Game.NM][this.curPeriod]--;
        this.goalsHome[Game.HD][this.curPeriod]--;
        this.goalsHome[Game.NM][this.curPeriod]--;
        if(this.curGoalieAway === Game.STARTER) {
            this.goalsHomeStarter[Game.NM][this.curPeriod]--;
            this.goalsHomeStarter[Game.HD][this.curPeriod]--;
            this.goalsHomeStarter[Game.BW][this.curPeriod]--;
        } else if(this.curGoalieAway === Game.BACKUP) {
            this.goalsHomeBackup[Game.NM][this.curPeriod]--;
            this.goalsHomeBackup[Game.HD][this.curPeriod]--;
            this.goalsHomeBackup[Game.BW][this.curPeriod]--;
        }
    }

    /// Away Goals
    /**
     * Increment the Away team's NM goals for the corresponding goalie (Starter/Backup)
     */
    addGoalAway() {
        this.addShotAway();
        this.goalsAway[Game.NM][this.curPeriod]++;
        if(this.curGoalieHome === Game.STARTER) {
            this.goalsAwayStarter[Game.NM][this.curPeriod]++;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.goalsAwayBackup[Game.NM][this.curPeriod]++;
        }
    }

    /**
     * Increment the Away team's HD and NM goals for the corresponding goalie (Starter/Backup)
     */
    addHDGoalAway() {
        this.addHDShotAway();
        this.goalsAway[Game.NM][this.curPeriod]++;
        this.goalsAway[Game.HD][this.curPeriod]++;
        if(this.curGoalieHome === Game.STARTER) {
            this.goalsAwayStarter[Game.NM][this.curPeriod]++;
            this.goalsAwayStarter[Game.HD][this.curPeriod]++;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.goalsAwayBackup[Game.NM][this.curPeriod]++;
            this.goalsAwayBackup[Game.HD][this.curPeriod]++;
        }
    }

    /**
     * Increment the Away team's BW, HD, and NM goals for the corresponding goalie (Starter/Backup)
     */
    addBWGoalAway() {
        this.addBWShotAway();
        this.goalsAway[Game.NM][this.curPeriod]++;
        this.goalsAway[Game.HD][this.curPeriod]++;
        this.goalsAway[Game.NM][this.curPeriod]++;
        if(this.curGoalieHome === Game.STARTER) {
            this.goalsAwayStarter[Game.NM][this.curPeriod]++;
            this.goalsAwayStarter[Game.HD][this.curPeriod]++;
            this.goalsAwayStarter[Game.BW][this.curPeriod]++;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.goalsAwayBackup[Game.NM][this.curPeriod]++;
            this.goalsAwayBackup[Game.HD][this.curPeriod]++;
            this.goalsAwayBackup[Game.BW][this.curPeriod]++;
        }
    }

    /**
     * Decrement the Away team's NM goals for the corresponding goalie (Starter/Backup)
     */
    removeGoalAway() {
        this.removeShotAway();
        this.goalsAway[Game.NM][this.curPeriod]--;
        if(this.curGoalieHome === Game.STARTER) {
            this.goalsAwayStarter[Game.NM][this.curPeriod]--;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.goalsAwayBackup[Game.NM][this.curPeriod]--;
        }
    }

    /**
     * Decrement the Away team's HD and NM goals for the corresponding goalie (Starter/Backup)
     */
    removeHDGoalAway() {
        this.removeHDShotAway();
        this.goalsAway[Game.NM][this.curPeriod]--;
        this.goalsAway[Game.HD][this.curPeriod]--;
        if(this.curGoalieHome === Game.STARTER) {
            this.goalsAwayStarter[Game.NM][this.curPeriod]--;
            this.goalsAwayStarter[Game.HD][this.curPeriod]--;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.goalsAwayBackup[Game.NM][this.curPeriod]--;
            this.goalsAwayBackup[Game.HD][this.curPeriod]--;
        }
    }

    /**
     * Decrement the Away team's BW, HD, and NM goals for the corresponding goalie (Starter/Backup)
     */
    removeBWGoalAway() {
        this.removeBWShotHome();
        this.goalsAway[Game.NM][this.curPeriod]--;
        this.goalsAway[Game.HD][this.curPeriod]--;
        this.goalsAway[Game.NM][this.curPeriod]--;
        if(this.curGoalieHome === Game.STARTER) {
            this.goalsAwayStarter[Game.NM][this.curPeriod]--;
            this.goalsAwayStarter[Game.HD][this.curPeriod]--;
            this.goalsAwayStarter[Game.BW][this.curPeriod]--;
        } else if(this.curGoalieHome === Game.BACKUP) {
            this.goalsAwayBackup[Game.NM][this.curPeriod]--;
            this.goalsAwayBackup[Game.HD][this.curPeriod]--;
            this.goalsAwayBackup[Game.BW][this.curPeriod]--;
        }
    }

    /// Period Functions
    /**
     * Increment the current period and the time played for current goalies
     */
    incrementPeriod() {
        this.curPeriod < this.periods ? this.curPeriod++ : this.curPeriod;
        this.timePlayedHome[this.curGoalieHome] += this.periodLength;
        this.timePlayedAway[this.curGoalieAway] += this.periodLength;
    }

    /**
     * Decrement the current period and the time played for current goalies
     */
    decrementPeriod() {
        this.curPeriod > 1 ? this.curPeriod-- : this.curPeriod;
        this.timePlayedHome[this.curGoalieHome] -= this.periodLength;
        this.timePlayedAway[this.curGoalieAway] -= this.periodLength;
    }

    /// Goalie Change Functions
    /**
     * Switch the home team's goalies
     *
     * @param {Number} timeout The time remaining in the period that the switch happened (fractional time)
     */
    changeHomeGoalie(timeout) {
        this.timePlayedHome[this.curGoalieHome] -= timeout;
        this.curGoalieHome === Game.STARTER ? this.curGoalieHome = Game.BACKUP : this.curGoalieHome = Game.STARTER;
        this.timePlayedHome[this.curGoalieHome] += timeout;
    }

    /**
     * Pull the home team's goalie
     *
     * @param {Number} timeout The time remaining in the period that the goalie was pulled (fractional time)
     */
    pullHomeGoalie(timeout) {
        this.timePlayedHome[this.curGoalieHome] -= timeout;
        this.pulledGoalieHome = this.curGoalieHome;
        this.curGoalieHome = Game.EMPTY;
        this.timePlayedHome[this.curGoalieHome] += timeout;
    }

    /**
     * Return the home team's goalie
     *
     * @param {Number} timein The time remaining in the period that the goalie was returned (fractional time)
     */
    returnHomeGoalie(timein) {
        this.timePlayedHome[this.curGoalieHome] -= timein;
        this.curGoalieHome = this.pulledGoalieHome;
        this.pulledGoalieHome = Game.EMPTY;
        this.timePlayedHome[this.curGoalieHome] += timein;
    }

    /**
     * Switch the away team's goalies
     *
     * @param {Number} timeout The time remaining in the period that the switch happened (fractional time)
     */
    changeAwayGoalie(timeout) {
        this.timePlayedAway[this.curGoalieAway] -= timeout;
        this.curGoalieAway === Game.STARTER ? this.curGoalieAway = Game.BACKUP : this.curGoalieAway = Game.STARTER;
        this.timePlayedAway[this.curGoalieAway] += timeout;
    }

    /**
     * Pull the away team's goalie
     *
     * @param {Number} timeout The time remaining in the period that the goalie was pulled (fractional time)
     */
    pullAwayGoalie(timeout) {
        this.timePlayedAway[this.curGoalieAway] -= timeout;
        this.pulledGoalieAway = this.curGoalieAway;
        this.curGoalieAway = Game.EMPTY;
        this.timePlayedAway[this.curGoalieAway] += timeout;
    }

    /**
     * Return the away team's goalie
     *
     * @param {Number} timein The time remaining in the period that the goalie was returned (fractional time)
     */
    returnAwayGoalie(timein) {
        this.timePlayedAway[this.curGoalieAway] -= timein;
        this.curGoalieAway = this.pulledGoalieAway;
        this.pulledGoalieAway = Game.EMPTY;
        this.timePlayedAway[this.curGoalieAway] += timein;
    }

    /// Update Stats
    /**
     * Calculate all the stats for home and away teams
     */
    updateStats() {
        /// Home
        this.savesHome = this.updateSaves(this.shotsAway, this.goalsAway);
        this.gaHome = this.goalsAway;
        this.svpcHome = this.updateSVPC(this.savesHome, this.shotsAway);
        this.gaaHome = this.updateGAA(this.periodLength * this.periods, this.gaHome);

        // Starter
        this.savesHomeStarter = this.updateSaves(this.shotsAwayStarter, this.goalsAwayStarter);
        this.gaHomeStarter = this.goalsAwayStarter;
        this.svpcHomeStarter = this.updateSVPC(this.savesHomeStarter, this.shotsAwayStarter);
        this.gaaHomeStarter = this.updateGAA(this.timePlayedHome[Game.STARTER], this.gaHomeStarter);

        // Backup
        this.savesHomeBackup = this.updateSaves(this.shotsAwayBackup, this.goalsAwayBackup);
        this.gaHomeBackup = this.goalsAwayBackup;
        this.svpcHomeBackup = this.updateSVPC(this.savesHomeBackup, this.shotsAwayBackup);
        this.gaaHomeBackup = this.updateGAA(this.timePlayedHome[Game.BACKUP], this.gaHomeBackup);

        /// Away
        this.savesAway = this.updateSaves(this.shotsHome, this.goalsHome);
        this.gaAway = this.goalsHome;
        this.svpcAway = this.updateSVPC(this.savesAway, this.shotsHome);
        this.gaaAway = this.updateGAA(this.periodLength * this.periods, this.gaAway);

        // Starter
        this.savesAwayStarter = this.updateSaves(this.shotsHomeStarter, this.goalsHomeStarter);
        this.gaAwayStarter = this.goalsHomeStarter;
        this.svpcAwayStarter = this.updateSVPC(this.savesAwayStarter, this.shotsHomeStarter);
        this.gaaAwayStarter = this.updateGAA(this.timePlayedAway[Game.STARTER], this.gaAwayStarter);

        // Backup
        this.savesAwayBackup = this.updateSaves(this.shotsHomeBackup, this.goalsHomeBackup);
        this.gaAwayBackup = this.goalsHomeBackup;
        this.svpcAwayBackup = this.updateSVPC(this.savesAwayBackup, this.shotsHomeBackup);
        this.gaaAwayBackup = this.updateGAA(this.timePlayedAway[Game.BACKUP], this.gaAwayBackup)

        /// Determine result
        this.determineResult();
    }

    /**
     * Update the saves a goalie has made based on the shots for and goals for of the opposing team
     *
     * @param {BigInt[][]} shots The shots against a goalie
     * @param {BigInt[][]} goals The goals against a goalie
     * @returns {BigInt[][]} The amount of saves the goalie has made
     */
    updateSaves(shots, goals) {
        let saves = [[], [], []];
        saves[Game.NM] = shots[Game.NM].map((n, i) => n - goals[Game.NM][i]);
        saves[Game.HD] = shots[Game.HD].map((n, i) => n - goals[Game.HD][i]);
        saves[Game.BW] = shots[Game.BW].map((n, i) => n - goals[Game.BW][i]);
        return saves;
    }

    /**
     * Update the save percentage of a goalie based on the saves of the goalie and the shots for of the opposing team
     *
     * @param {BigInt[][]} saves The number of saves the goalie made
     * @param {BigInt[][]} shots The number of shots faced by the goalie
     * @returns {Number[][]} The save percentage of the goalie
     */
    updateSVPC(saves, shots) {
        let svpc = [[], [], []];
        svpc[Game.NM] = saves[Game.NM].map((n, i) => n / (shots[Game.NM][i] !== 0 ? shots[Game.NM][i] : 1));
        svpc[Game.HD] = saves[Game.HD].map((n, i) => n / (shots[Game.HD][i] !== 0 ? shots[Game.HD][i] : 1));
        svpc[Game.BW] = saves[Game.BW].map((n, i) => n / (shots[Game.BW][i] !== 0 ? shots[Game.BW][i] : 1));
        return svpc;
    }

    /**
     * Update the goals against average of a goalie based on the time played and goals allowed of the goalie
     *
     * @param {Number} timePlayed The amount of time that the goalie has played
     * @param {BigInt[][]} goals The goals against of the goalie
     * @returns {Number[][]} The goals against average of the goalie
     */
    updateGAA(timePlayed, goals) {
        let gaa = [[], [], []];
        gaa[Game.NM] = goals[Game.NM].map((n) => (n / timePlayed) * this.periods * this.periodLength);
        gaa[Game.HD] = goals[Game.HD].map((n) => (n / timePlayed) * this.periods * this.periodLength);
        gaa[Game.BW] = goals[Game.BW].map((n) => (n / timePlayed) * this.periods * this.periodLength);
        return gaa;
    }

}

/// Export Class
module.exports = {
    Game,
};