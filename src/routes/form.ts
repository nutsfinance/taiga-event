import { Router, Request, Response } from "express";
import { Keyring } from "@polkadot/keyring";
import { getUser, updateUser } from "../user/controller";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const keyring = new Keyring();



const ensureLoggedIn = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/discord");
  }
};

export const formRoutes = Router();

formRoutes.get("/", ensureLoggedIn, async (req, res) => {
  const userId = (req.session as any).passport.user;
  const user = await getUser(userId);
if ((new Date().getTime() / 1000) > 1644153298) {
  res.render("profile-too-late");
  return;
}
  res.render("form", {
    username: user!.discordUsername,
    karuraAddress: user!.karuraAddress,
    karuraCrowdLoanAddress: user!.karuraCrowdLoanAddress,
    email: user!.email,
    telegramUser: user!.telegramUser,
  });
});

formRoutes.post("/", ensureLoggedIn, async (req, res) => {
  const userId = (req.session as any).passport.user;
  const username = req.body.username;
  const emailInput = req.body.email;
  const karuraCrowdLoanAddress = req.body.karuraCrowdLoanAddress;
  const karuraAddress = req.body.karuraAddress;
  const telegramUser = req.body.telegramUser;
  let address: string | undefined;
  // let mandalaAddress: string | undefined;
  try {
    address = keyring.encodeAddress(karuraAddress, 8);
    // mandalaAddress = keyring.encodeAddress(mandalaAddressInput, 42);
    //id: string,discordUsername:string, karuraAddress:string, karuraCrowdLoanAddress:string, email: string, telegramUser:string
    const updateRes = await updateUser(
      userId,
      username,
      karuraAddress,
      karuraCrowdLoanAddress,
      emailInput,
      telegramUser
    );

    

    if (updateRes) {
      res.redirect("/form/success");
    } else {
      res.render("form", {
        username: username,
        email: emailInput,
        karuraAddress: karuraAddress,
        karuraCrowdLoanAddress: karuraCrowdLoanAddress,
        telegramUser: telegramUser,
        error: "Error Submitting Form",
      });
    }
  } catch (error) {
    console.error(error);
    const errorMessage = `Invalid ${!address ? "Karura" : "Mandala"} Address`;

    res.render("form", {
      username: username,
      email: emailInput,
      karuraAddress: karuraAddress,
      karuraCrowdLoanAddress: karuraCrowdLoanAddress,
      telegramUser: telegramUser,
      error: errorMessage,
    });
  }
});
let date: Date = new Date();
date: date.getUTCDate();

formRoutes.get("/success", ensureLoggedIn, (_req, res) => {
  res.render("success", {
    year: date.getUTCFullYear(),
    day: date.getUTCDay(),
    hours: date.getUTCHours(),
    month: monthNames[date.getMonth()],
    min: date.getUTCMinutes(),
    sec: date.getUTCSeconds
  });
});
