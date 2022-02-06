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
  //console.log("user try to access"+user!.discordUsername)
  if (!user) return res.render("500");

  const insertedTime = new Date(user.insertedAt).getTime() / 1000;

  if (insertedTime > 1641772799) {
    //res.render("profile-too-late");
    //return;
  }

  const inKaruraSnapshot = user.inKaruraSnapshot;
  const crowdcastParticipant = user.karuraCrowdLoanAddress;
  const mission1Complete = user.mission1Complete;
  const mission2Complete = user.mission2Complete;



  let role = "None";

  if (user.xp >= 1150) {
    role = "Trekker";
  } else if (user.xp >= 225) {
    role = "Camper";
  }

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
