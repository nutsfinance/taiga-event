import { Router, Request, Response } from "express";
import { getUser } from "../user/controller";
import { checkMissionTest } from "../user/usersUtils";
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
  if (userXp == null) return res.render("500");
  let mission1Complete= checkMissionTest(user!.acalaAddress);
  let mission2Complete= checkMissionTest(user!.acalaAddress);
  let mission3Complete= checkMissionTest(user!.acalaAddress);
  let inServer = checkMissionTest(user!.acalaAddress);

  if(mission1Complete)userXp=+100;
  if(mission2Complete)userXp=+200;
  if(mission3Complete)userXp=+200;
  if(!mission1Complete) userXp =0;
  if(!inServer) userXp = 0;

  return res.render("profile", {
    username: user?.discsordUsername,
    mission1Complete: mission1Complete,
    mission2Complete: mission2Complete,
    mission3Complete: mission3Complete,
    inServer: inServer,
    totalXp: userXp
  });
});
