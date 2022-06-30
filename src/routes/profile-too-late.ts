import { Router } from "express";

export const profileTooLateRoutes = Router();

profileTooLateRoutes.get("/", (_req, res) => {
  res.render("profile-too-late");
})