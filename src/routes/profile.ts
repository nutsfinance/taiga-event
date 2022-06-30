import { Router, Request, Response } from "express";
import { getUser } from "../user/controller";
import { getOldUserXp, checkMission1, checkMission2, checkMission3, checkIsInServer } from "../user/usersUtils";
const userUtils = require("../user/usersUtils");

const ensureLoggedIn = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/discord");
  }
};

export const profileRoutes = Router();

profileRoutes.get("/", ensureLoggedIn, async (req, res) => {
  const id: string = (req.session as any).passport.user;
  const user = await getUser(id);

  let userXp = 0;
  if (!user) return res.render("500");
  let oldUserXp = getOldUserXp(user!.id);
  let mission1Complete= checkMission1(user!.acalaAddress);
  let mission2Complete= checkMission2(user!.email);
  let mission3Complete= checkMission3(user!.discordId);
  let inServer = checkIsInServer(user!.discordId);

  console.log("mission3"+mission3Complete);

  if(mission1Complete && mission2Complete && mission3Complete)userXp+=1000;
  else if(mission1Complete && mission3Complete)userXp+=700;
  else if(mission1Complete && mission2Complete) userXp =700;
  else if(mission1Complete) userXp += 500;
  if(!inServer) userXp = 0;
  userXp += oldUserXp;

  return res.render("profile", {
    username: user.discordUsername,
    mission1Complete: mission1Complete,
    mission2Complete: mission2Complete,
    mission3Complete: mission3Complete,
    inServer: inServer,
    totalXp: userXp
  });
});
