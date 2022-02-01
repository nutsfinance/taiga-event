import { Router } from "express";

export const loginRoutes = Router();

loginRoutes.get("/", (_req, res) => {
  res.render("login");
})