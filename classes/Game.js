
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

        // Home Starter (Shots vs. away team starter goalie)
        this.shotsHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaHomeStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.timePlayedHomeStarter = 0;

        // Home Backup (Shots vs. away team backup goalie)
        this.shotsHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaHomeBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.timePlayedHomeBackup = 0;

        /// Away (stats are shots for/goals for, but ga, svpc, and gaa are of that teams goalie) [NM, HD, BW]
        // Each internal array will have values for each period
        this.shotsAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaAway = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.curGoalieAway = Game.STARTER;

        // Away Starter (Shots vs. home team starter goalie)
        this.shotsAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaAwayStarter = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.timePlayedAwayStarter = 0;

        // Away Backup (Shots vs. home team backup goalie)
        this.shotsAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.goalsAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.savesAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.svpcAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.gaaAwayBackup = Array(3).fill().map(() => Array(this.periods).fill(0));
        this.timePlayedAwayBackup = 0;
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





}