const karuraUsers = require('../../karura-users.json'); 
const oldUsers = require('../../old-event-users.json');
const crowdloanPartecipants = require('../../crowdloanPartecipants.json');

export function checkKaruraUser(adress:string) {
    for(var i = 0;i< karuraUsers.length;i++){
        //console.log(karuraUsers[i]);
        if(karuraUsers[i] == adress)return true;
    }
    return false;
}

export function checkOldUser(adress:string, discorId:string) {
    for(var i = 0;i< oldUsers.length;i++){
        if(oldUsers[i].Verified_Karura_Address == adress)return true;
        if(oldUsers[i].Discord_ID == discorId)return true;
    }
    return false;
}

export function checkCrowdCastPartecipant(adress:string) {
    for(var i = 0;i< crowdloanPartecipants.length;i++) {
        //console.log(crowdloanPartecipants[i].address)
        if(crowdloanPartecipants[i].account == adress)return true;
    }
    return false;
}
