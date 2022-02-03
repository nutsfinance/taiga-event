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

export function checkOldUser(adress:string) {
    for(var i = 0;i< oldUsers.length;i++){
        //console.log(oldUsers[i].Verified_Karura_Address);
        if(oldUsers[i].Verified_Karura_Address == adress)return true;
    }
    return false;
}

export function checkCrowdCastPartecipant(adress:string) {
    for(var i = 0;i< crowdloanPartecipants.length;i++) {
        //console.log(crowdloanPartecipants[i].address)
        if(crowdloanPartecipants[i].address == adress)return true;
    }
    return false;
}