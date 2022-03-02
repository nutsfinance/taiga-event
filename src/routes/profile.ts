import { Router, Request, Response } from "express";
import { getUser } from "../user/controller";
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
  if (!user) return res.render("500");

  //const insertedTime = new Date(user.insertedAt).getTime() / 1000;
  let userXp = userUtils.getUserXp(user!.id);
  const inKaruraSnapshot = user.inKaruraSnapshot;
  const crowdcastParticipant = user.karuraCrowdLoanAddress;
  if (userXp == null) return res.render("500");
  let mission1Complete = userXp.emailMission == 0 ? false : true;
  let mission2Complete = userXp.telegramMission == 0 ? false : true;
  let role = userXp.Role;

  if(userUtils.checkOldUser(user!.karuraAddress, user!.id)) {
    res.render("profile", {
      username: user.discordUsername,
      inOldUsers: true,
      inKaruraSnapshot: false,
      crowdcastParticipant: false,
      mission1Complete,
      mission2Complete,
      role
    });
    return
  }

  res.render("profile", {
    username: user.discsordUsername,
    inOldUsers: false,
    inKaruraSnapshot: userUtils.checkKaruraUser(user!.karuraAddress),
    crowdcastParticipant: userUtils.checkCrowdCastPartecipant(user!.karuraCrowdLoanAddress),
    mission1Complete,
    mission2Complete,
    role
  });
});
