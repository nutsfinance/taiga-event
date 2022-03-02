const karuraUsers = require('../../json/karura-users.json'); 
const oldUsers = require('../../json/old-event-users.json');
const crowdloanPartecipants = require('../../json/crowdloanPartecipants.json') ;
const telegramUsers = require('../../json/telegramverifiedUsers.json');
const emailList = require('../../json/EmailList.json')
const userXp = require('../../json/xpUsersFile.json');

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

export function checktelegramuser(name:string){
    for(var i = 0; i < telegramUsers.length; i++){
        if(telegramUsers[i].names.includes(name))return true
    }
    return false;
}

export function checkEmailList(email:string){
    for(var i = 0; i < emailList.length; i++){
        console.log(emailList[i].Email);
        if(emailList[i].Email == email) return true
        
    }
    return false;
}

export function getUserXp(id:string){
    for(var i = 0; i < userXp.length; i++){
        if(userXp[i].id == id) return userXp[i]
        
    }
    return null;
}