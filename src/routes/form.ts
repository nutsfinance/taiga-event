import { Router, Request, Response } from "express";
import { Keyring } from "@polkadot/keyring";
import { getUser, updateUser } from "../user/controller";
import { Int32 } from "mongodb";
var startTime = performance.now();
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
  if ((new Date().getTime() / 1000) > 1644163128) {
    res.render("profile-too-late");
    return;
  }
  startTime = performance.now()
  console.log("apertura pagina"+startTime);
  const userId = (req.session as any).passport.user;
  const user = await getUser(userId);
  
  if (user) {
    res.render("form", {
      username: user!.discordUsername,
      karuraAddress: user!.karuraAddress,
      karuraCrowdLoanAddress: user!.karuraCrowdLoanAddress,
      email: user!.email,
      telegramUser: user!.telegramUser,
    });
  } else {
    res.render("form", {
      username: "",
      karuraAddress: "",
      karuraCrowdLoanAddress: "",
      email: "",
      telegramUser: "",
    });
  }
});

formRoutes.post("/", ensureLoggedIn, async (req, res) => {
  console.log("chiamata submit");
  var endTime = performance.now()
  var totalime = endTime - startTime;
  console.log("total time "+totalime);
  var timeOver = false;
  if(totalime < 4500){
    console.log("timeovered")
    timeOver = true;
  }
  const userId = (req.session as any).passport.user;
  const username = req.body.username;
  const emailInput = req.body.email;
  const karuraCrowdLoanAddress = req.body.karuraCrowdLoanAddress;
  const karuraAddress = req.body.karuraAddress;
  const telegramUser = req.body.telegramUser;
  let address: string | undefined;
  try {
    //address = keyring.encodeAddress(karuraAddress, 8);
    address = karuraAddress;
    if(!timeOver){
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
  }else{
      res.redirect("/form/unsuccess");
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

formRoutes.get("/unsuccess", ensureLoggedIn, (_req, res) => {
  res.render("unsuccess", {});
});
