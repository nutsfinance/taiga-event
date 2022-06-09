import { Router, Request, Response } from "express";
import { getUser } from "../user/controller";
const userUtils = require("../user/usersUtils");

const ensureLoggedIn = (req: Request, res: Response, next: any) => {
  next()
  // if (req.isAuthenticated()) {
  //   next();
  // } else {
  //   res.redirect("/auth/discord");
  // }
};

export const profileRoutes = Router();

profileRoutes.get("/", ensureLoggedIn, async (req, res) => {
  const id: string = (req.session as any).passport.user;
  const user = await getUser(id);
  //if (!user) return res.render("500");

  //const insertedTime = new Date(user.insertedAt).getTime() / 1000;
  let userXp = user?.totalXp;
  //if (userXp == null) return res.render("500");

  res.render("profile", {
    username: user?.discsordUsername,
    inOldUsers: false,
    inKaruraSnapshot: userUtils.checkKaruraUser(user!.karuraAddress),
    crowdcastParticipant: userUtils.checkCrowdCastPartecipant(user!.karuraCrowdLoanAddress),
    mission1Complete: true,
    mission2Complete: true,
    role: 'TREK'
  });
});
