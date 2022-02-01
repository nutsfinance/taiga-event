import { Router, Request, Response } from "express";
import passport from "passport";

const alreadyLoggedIn = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  } else {
    next();
  }
};

export const authRoutes = Router();

authRoutes.get("/discord", alreadyLoggedIn, passport.authenticate("discord"));

authRoutes.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  (_req, res) => {
    console.log("test")
    res.redirect("/profile");
  }
);
