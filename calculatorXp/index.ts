
import { User } from "./user";
import { getOldUserXp, checkMission1,  checkMission2,checkMission3, checkIsInServer } from "../src/user/usersUtils";
console.log("ciao")
// const users = require('./usersBackup.json');
// const fs = require('fs');

// for(var i = 0;i< users.length;i++) {
// console.log(users[i])
//     if(users[i].acalaAddress != undefined) {
//         let userXp = 0;
//         var user:User = {};
//         user.discordUsername = users[i].discordUsername == undefined ? "" : users[i].discordUsername;
//         user.acalaAddress = users[i].acalaAddress == undefined ? "" : users[i].acalaAddress;
//         user.email = users[i].email == undefined ? "" : users[i].email;
//         user.discordId = users[i].discordId == undefined ? "" : users[i].discordId;
//         user.twitterAddress = users[i].twitterAddress == undefined ? "" : users[i].twitterAddress;
//         user.tweetLink = users[i].tweetLink == undefined ? "" : users[i].tweetLink
//         user.emailMission = users[i].emailMission == undefined ? false :  users[i].emailMission
//         user.twitterMission = users[i].twitterMission == undefined ? false : users[i].twitterMission;
//         user.missionXp = users[i].missionXp == undefined ? 0 : users[i].missionXp;
//         user.existingXp = users[i].existingXp == undefined ? 0 : users[i].existingXp
//         user.totalXp = users[i].totalXp == undefined ? 0 : users[i].totalXp
//         user.inServer = users[i].inServer == undefined ? false : users[i].inServer
//         user.role = users[i].role == undefined ? false : users[i].role
        
//         let oldUserXp = getOldUserXp(users[i].discordId);
//         let mission1Complete= checkMission1(users[i].acalaAddress);
//         let mission2Complete= checkMission2(users[i].email);
//         let mission3Complete= checkMission3(users[i].discordId);
//         let inServer = checkIsInServer(users[i].discordId);

//         if(mission1Complete && mission2Complete && mission3Complete)userXp+=1000;
//         else if(mission1Complete && mission3Complete)userXp+=700;
//         else if(mission1Complete && mission2Complete) userXp =700;
//         else if(mission1Complete) userXp += 500;
//         if(!inServer) userXp = 0;
//         user.missionXp = userXp;
//         userXp += oldUserXp;

//         user.existingXp = oldUserXp;
//         user.totalXp = userXp
//         user.acalaMission = mission1Complete
//         user.emailMission = mission2Complete
//         user.twitterMission = mission3Complete
//         user.inServer = inServer

//         fs.writeFileSync('./xpUsersFile.json', JSON.stringify(user),{ encoding: "utf8", flag: "a" } );

//     }
// }