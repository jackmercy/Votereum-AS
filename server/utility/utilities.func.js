import { RoleConfig }    from '../config/role.config';
import Ballot            from '../models/ballot.model';

/* Timeout for each phase */
global.startRegPhase;
global.endRegPhase;
global.startVotingPhase;
global.endVotingPhase;
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
            global.startRegPhase = setTimeout(callback, eta);
        }
    });
}

global.EndRegPhase = function(_ballotName, callback) {
    var query = { ballotName: _ballotName };
    Ballot.findOne(query, function(err, ballot) {
        if (err) {
            console.log(err);
        } else if(ballot) {
            let endRegPhase = ballot.endRegPhase;
            let eta = ETAtime(GetTimestampNow(), endRegPhase);
            // auto end phase
            global.endRegPhase = setTimeout(callback, eta);
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
            global.startVotingPhase = setTimeout(callback, eta);
        }
    });
}

global.EndVotingPhase = function(_ballotName, callback) {
    var query = { ballotName: _ballotName };
    Ballot.findOne(query, function(err, ballot) {
        if (err) {
            console.log(err);
        } else if(ballot) {
            let endVotingPhase = ballot.endVotingPhase;
            let eta = ETAtime(GetTimestampNow(), endVotingPhase);
            // auto end phase
            global.endVotingPhase = setTimeout(callback, eta);
        }
    });
}

global.CancelStartRegPhase = function() {
    clearTimeout(global.startRegPhase);
}

global.CancelEndRegPhase = function() {
    clearTimeout(global.endRegPhase);
}

global.CancelStartVotingPhase = function() {
    clearTimeout(global.startVotingPhase);
}

global.CancelEndVotingPhase = function() {
    clearTimeout(global.endVotingPhase);
}



