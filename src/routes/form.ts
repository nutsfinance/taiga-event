import { Router, Request, Response } from "express";
import { Keyring } from "@polkadot/keyring";
import { getByAcalaAddress, getByTwitterAddress, getUser, updateUser, getByEmail } from "../user/controller";
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
  const userId = (req.session as any).passport.user;
  const user = await getUser(userId);
  console.log("testtest="+userId);
  if (user) {
    res.render("form", {
      username: user!.discordUsername,
      acalaAddress: user!.acalaAddress,
      email: user!.email,
      addressTwitter: user!.twitterLink,
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
  
 
  const userId = (req.session as any).passport.user;
  const username = req.body.username;
  const emailInput = req.body.email;
  const acalaAddress = req.body.acalaAddress;
  const twitterLink = req.body.addressTwitter;
  let address: string | undefined;
  //check acalAddress and username ar not empty
  if(username == null || username == "" || acalaAddress == null || acalaAddress == "")return res.render("unsuccess", {});

  //check if this data are already inserted
  if(acalaAddress != "" && acalaAddress != null){
    let check1 = await getByAcalaAddress(acalaAddress)
    if(check1 != null) return res.render("form", {  username: username, email: emailInput,acalaAddress: acalaAddress,addressTwitter: twitterLink,error: "Error Submitting Form or acalaAddress already exhist" });
  }

  if(twitterLink != "" && twitterLink != null){
    let check2 = await getByTwitterAddress(twitterLink)
    if(check2 != null) return res.render("form", { username: username, email: emailInput,acalaAddress: acalaAddress,addressTwitter: twitterLink,error: "Error Submitting Form or twitterAddress already exhist" });
  }

  if(emailInput != "" && emailInput != null){
    let check3 = await getByEmail(emailInput)
    if(check3 != null) return res.render("form", { username: username, email: emailInput,acalaAddress: acalaAddress,addressTwitter: twitterLink,error: "Error Submitting Form or emailAddress already exhist" });
  }

  // if we are here the data is ok
  try {
    address = acalaAddress;
    const updateRes = await updateUser(
      userId,
      username,
      acalaAddress,
      twitterLink,
      emailInput
    );

    if (updateRes) {
      res.redirect("/form/success");
    } else {
      res.render("form", {
        username: username,
        email: emailInput,
        acalaAddress: acalaAddress,
        addressTwitter: twitterLink,
        error: "Error Submitting Form or user already exhist",
      });
    }
  
  } catch (error) {
    console.error(error);
    const errorMessage = `Invalid ${!address}  Address`;

    res.render("form", {
      username: username,
      email: emailInput,
      acalaAddress: acalaAddress,
      addressTwitter: twitterLink,
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
