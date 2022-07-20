import { Router, Request, Response } from "express";
import { Keyring } from "@polkadot/keyring";
import { getByAcalaAddress, getByTwitterAddress, getUser, updateUser, getByEmail, getByKaruraAddress } from "../user/controller";
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
  res.render("profile-too-late");
  if (user) {
    res.render("form", {
      username: user!.discordUsername,
      //karuraAddress: user!.karuraAddress,
      email: user!.email,
      addressTwitter: user!.twitterLink,
    });
  } else {
    res.render("form", {
      username: "",
      //karuraAddress: "",
      karuraCrowdLoanAddress: "",
      email: "",
      telegramUser: "",
    });
  }
});

formRoutes.post("/", ensureLoggedIn, async (req, res) => {
  const userId = (req.session as any).passport.user;
  const username = req.body.username;
  const emailInput = req.body.email;
  //let karuraAddress = req.body.karuraAddress;
  const twitterLink = req.body.addressTwitter;
  let address: string | undefined;
  // if(karuraAddress == "" || karuraAddress == null)return 
  // try {
  //   karuraAddress = keyring.encodeAddress(keyring.decodeAddress(karuraAddress), 8)
  // }catch(err){
  //   console.log(err)
  //   return res.render("form", { username: username, email: emailInput,karuraAddress: karuraAddress,addressTwitter: twitterLink,error: "The address inserted is invalid please try again" });
  // }

  //check acalAddress and username ar not empty
  if(username == null || username == "")return res.render("unsuccess", {});

  //check if this data are already inserted
  // if(karuraAddress != "" && karuraAddress != null){
  //   let check1 = await getByKaruraAddress(karuraAddress)
  //   if(check1?.discordId != userId && check1 != null) return res.render("form", {  username: username, email: emailInput,karuraAddress: karuraAddress,addressTwitter: twitterLink,error: "Form submitting error or Karura address already submittedt" });
  // }

  if(twitterLink != "" && twitterLink != null){
    let check2 = await getByTwitterAddress(twitterLink)
    if(check2?.discordId != userId && check2 != null) return res.render("form", { username: username, email: emailInput,karuraAddress: "",addressTwitter: twitterLink,error: "Form submitting error or Tweet link already submitted" });
  }

  if(emailInput != "" && emailInput != null){
    let check3 = await getByEmail(emailInput)
    if(check3?.discordId != userId && check3 != null) return res.render("form", { username: username, email: emailInput,karuraAddress: "",addressTwitter: twitterLink,error: "Form submitting error or Email address already submitted" });
  }

  // if we are here the data is ok
  try {
    //address = karuraAddress;
    const updateRes = await updateUser(
      userId,
      username,
      "",
      twitterLink,
      emailInput
    );

    if (updateRes) {
      res.redirect("/form/success");
    } else {
      res.render("form", {
        username: username,
        email: emailInput,
        karuraAddress: "",
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
      karuraAddress: "",
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
