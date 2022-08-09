import { Router, Request, Response } from "express";
import { Keyring } from "@polkadot/keyring";
import { getByAcalaAddress, getByTwitterAddress, getUser, updateUser, getByEmail, getByKaruraAddress, getUserByTelegramName } from "../user/controller";
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
  if(1==1)return res.render("profile-too-late");
  var q1 = user!.resp1;
  var q2 = user!.resp2;
  var q3 = user!.resp3;
  var checked1_1;
  var checked1_2;
  var checked1_3;
  var checked2_1;
  var checked2_2;
  var checked2_3;
  var checked3_1;
  var checked3_2;
  var checked3_3;
  //q3
  if(q1==1) checked1_1 = "checked"
  else if(q1 == 2) checked1_2 = "checked"
  else if (q1==3) checked1_3 = "checked"
//q2
  if(q2==1) checked2_1 = "checked"
  else if(q2 == 2) checked2_2 = "checked"
  else if(q2==3)checked2_3 = "checked"
  //q3
  if(q3==1) checked3_1 = "checked"
  else if(q3 == 2) checked3_2 = "checked"
  else if(q3==3) checked3_3 = "checked"



  if (user) {
    res.render("form", {
      username: user!.discordUsername,
      telegramUserName: user!.telegramUserName,
      addressTwitter: user!.twitterLink,
       checked1_1: checked1_1,
       checked1_2: checked1_2,
       checked1_3: checked1_3,
       checked2_1: checked2_1,
       checked2_2: checked2_2,
       checked2_3: checked2_3,
       checked3_1: checked3_1,
       checked3_2: checked3_2,
       checked3_3: checked3_3,
    });
  } else {
    res.render("form", {
      username: user!.discordUsername,
      telegramUserName: user!.telegramUserName,
      addressTwitter: user!.twitterLink,
       checked1_1: checked1_1,
       checked1_2: checked1_2,
       checked1_3: checked1_3,
       checked2_1: checked2_1,
       checked2_2: checked2_2,
       checked2_3: checked2_3,
       checked3_1: checked3_1,
       checked3_2: checked3_2,
       checked3_3: checked3_3,
    });
  }
});

formRoutes.post("/", ensureLoggedIn, async (req, res) => {
  //submit
  const userId = (req.session as any).passport.user;
  var username = req.body.username;
  //const emailInput = req.body.email;
  var twitterLink = req.body.addressTwitter;
  const telegramUserName = req.body.telegramUserName;
  const resp1 = req.body.q1;
  const resp2 = req.body.q2;
  const resp3 = req.body.q3;
  let address: string | undefined;

  //check acalAddress and username ar not empty
  if(username == null || username == "")return res.render("unsuccess", {});

  //check if this data are already inserted
  // if(karuraAddress != "" && karuraAddress != null){
  //   let check1 = await getByKaruraAddress(karuraAddress)
  //   if(check1?.discordId != userId && check1 != null) return res.render("form", {  username: username, email: emailInput,karuraAddress: karuraAddress,addressTwitter: twitterLink,error: "Form submitting error or Karura address already submittedt" });
  // }

  if(twitterLink != "" && twitterLink != null){
    let check2 = await getByTwitterAddress(twitterLink)
    if(check2?.discordId != userId && check2 != null) return res.render("form", { username: username, telegramUserName: telegramUserName,karuraAddress: "",addressTwitter: twitterLink,error: "Form submitting error or Tweet link already submitted" });
  }

  if(telegramUserName != "" && telegramUserName != null){
    let check2 = await getUserByTelegramName(telegramUserName)
    if(check2?.telegramUserName != userId && check2 != null) return res.render("form", { username: username, telegramUserName: telegramUserName,karuraAddress: "",addressTwitter: twitterLink,error: "Form submitting error or telegram UserName already submitted" });
  }

  // if we are here the data is ok
  try {
    //address = karuraAddress;
    const updateRes = await updateUser(
      userId,
      username,
      "",
      twitterLink,
      telegramUserName,
      resp1,
      resp2,
      resp3
    );

    if (updateRes) {
      res.redirect("/form/success");
    } else {
      res.render("form", {
        username: username,
        telegramUserName: telegramUserName,
        addressTwitter: twitterLink,
      });
    }
  
  } catch (error) {
    console.error(error);
    const errorMessage = `Invalid ${!address}  Address`;

    res.render("form", {
      username: username,
      telegramUsername: telegramUserName,
      addressTwitter: twitterLink,
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
