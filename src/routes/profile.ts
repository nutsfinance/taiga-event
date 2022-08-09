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
  var id: string = (req.session as any).passport.user;
  id = "631672661965144076";
  const user = await getUser(id);

  let userXp = 0;
  if (userUtils.getUserDataJson(user!.discordId) == null) return res.render("500");
  let questionMission = user!.resp1 == 2 && user!.resp2 == 3 && user!.resp3 == 3;
  //let telegramMission= checkMission1(user!.karuraAddress); // address
  let inServer = checkIsInServer(user!.discordId); // is in server 

  return res.render("profile", {
    username: user!.discordUsername,
    questionMission: questionMission,
    telegramMission: userUtils.getTelegramMission(id),
    tweetMission: userUtils.getTwitterMission(id),
    inServer: inServer,
    totalXp: userXp
  });
});
