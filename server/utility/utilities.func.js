import { RoleConfig }    from '../config/role.config';
import Ballot            from '../models/ballot.model';

/* Timeout for each phase */
global.RegPhase;
global.FundingPhase;
global.VotingPhase;
/* Timeout for each phase */

// ================================
// global function ================
// ================================
global.generateUuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

global.GetTimestampNow = function() {
    return Date.now(); // return timestamp in milliseconds
}

global.GetTimestampNowInSeconds = function() {
    return Math.floor(Date.now() / 1000) | 0;
}
/* Guard => return true if token is valid */
global.ExpirationGuard = function(decodedToken) {
    var tsNow = GetTimestampNowInSeconds();
    var exp = decodedToken['exp'];
    var check = exp - tsNow;
    if (check < 0) {
        return false;
    }
    return true;
}

global.CitizenGuard = function(decodedToken) {
    if (decodedToken['role'] === RoleConfig.CITIZEN) {
        return true;
    }
    return false;
}

global.EaGuard = function(decodedToken) {
    if (decodedToken['role'] === RoleConfig.EA) {
        return true;
    }
    return false;
}

global.RaGuard = function(decodedToken) {
    if (decodedToken['role'] === RoleConfig.RA) {
        return true;
    }
    return false;
}

global.ETAtime = function(startTime, endTime) {
    return startTime - endTime;
}

global.StartRegPhase = function(_ballotName, callback) {
    var query = { ballotName: _ballotName };
    Ballot.findOne(query, function(err, ballot) {
        if (err) {
            console.log(err);
        } else if(ballot) {
            let startRegTime = ballot.startRegPhase;
            let eta = ETAtime(startRegTime, GetTimestampNow());
            // auto start phase
            global.RegPhase = setTimeout(callback, eta);
        }
    });
}

global.StartFundingPhase = function(_ballotName, callback) {
    var query = { ballotName: _ballotName };
    Ballot.findOne(query, function(err, ballot) {
        if (err) {
            console.log(err);
        } else if(ballot) {
            var endRegTime = ballot.endRegPhase + 3600000; // end reg phase + 1 hour
            var eta = ETAtime(endRegTime, GetTimestampNow());
            setTimeout(callback, eta);
        }
    });
}


global.StartVotingPhase = function(_ballotName, callback) {
    var query = { ballotName: _ballotName };
    Ballot.findOne(query, function(err, ballot) {
        if (err) {
            console.log(err);
        } else if(ballot) {
            var startVotingPhase = ballot.startVotingPhase;
            var eta = ETAtime(startVotingPhase, GetTimestampNow());
            global.RegPhase = setTimeout(callback, eta);
        }
    });
}

global.CancelRegPhase = function() {
    clearTimeout(global.RegPhase);
}

global.CancelFundingPhase = function() {
    clearTimeout(global.FundingPhase);
}

global.CancelVotingPhase = function() {
    clearTimeout(global.VotingPhase);
}



