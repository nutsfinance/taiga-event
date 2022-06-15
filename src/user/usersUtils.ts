const userXp = require('../../json/oldUsersXp.json');
const mission1Json = require("../../json/mission1Json.json")
const mission2Json = require("../../json/mission2Json.json")
const mission3Json = require("../../json/mission3Json.json")
const missionIsInServer = require("../../json/missionIsInServerJson.json")

//acalaAddress
export function checkMission1(adress:string) {
    if(adress == "" || adress == null) return false;
    for(var i = 0;i< mission1Json.length;i++) {
        if(mission1Json[i] == adress)return true;
    }
    return false;
}
//email
export function checkMission2(email:string) {
    if(email == "" || email == null) return false;
    for(var i = 0;i< mission2Json.length;i++) {
        if(mission2Json[i] == email)return true;
    }
    return false;
}
//twitter
export function checkMission3(twitterAddress:string) {
    if(twitterAddress == "" || twitterAddress == null) return false;
    for(var i = 0;i< mission3Json.length;i++) {
        if(mission3Json[i] == twitterAddress)return true;
    }
    return false;
}
//isInServer
export function checkIsInServer(discorId:string) {
    if(discorId == "" || discorId == null) return false;
    for(var i = 0;i< missionIsInServer.length;i++) {
        if(missionIsInServer[i] == discorId)return true;
    }
    return false;
}
// getoldUserXp
export function getOldUserXp(discorId:string) {
    if(discorId == "" || discorId == null) return 0;
    for(var i = 0;i< userXp.length;i++){
        if(userXp[i].DiscordID == discorId)return userXp[i].TotalXP;
    }
    return 0;
}