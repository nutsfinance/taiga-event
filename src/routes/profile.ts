import { Router, Request, Response } from "express";
import { getUser } from "../user/controller";
const userUtils = require("../user/usersUtils");

const ensureLoggedIn = (req: Request, res: Response, next: any) => {
  next()
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
  
  let userXp = user?.totalXp;
  //if (userXp == null) return res.render("500");

  res.render("profile", {
    username: user?.discsordUsername,
    mission1Complete: user!.acalaAddress != null,
    mission2Complete: user!.emailMission,
    mission3Complete: user!.twitterMission,
    inServer: user!.isInServer,
    totalXp: userXp
  });
});
