import express, { Request, Response } from "express";
import passport from "passport";
import bodyParser from "body-parser";
import { Strategy as DiscordStrategy } from "passport-discord";
import { engine } from "express-handlebars";
import session from "express-session";
import path from "path";
import { User } from "./user/user";
import { getOrCreateUser, getUser } from "./user/controller";
import { loadEnv } from "./setup";
import { authRoutes, formRoutes, loginRoutes, profileRoutes, profileTooLateRoutes } from "./routes";
import { connect as dbConnect } from "./db";

function setupPassport() {
  const SCOPES = ["identify"];

  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env["CLIENT_ID"]!,
        clientSecret: process.env["CLIENT_SECRET"]!,
        callbackURL: process.env["CALLBACK_URL"]!,
        scope: SCOPES,
      },
      (_accessToken, _refreshToken, profile, cb) => {
        console.log("chiave di ricerca"+profile.id);
        getOrCreateUser(
          {
            discordId: profile.id,
            discordUsername: `${profile.username}#${profile.discriminator}`,
          },
          (err, user) => {
            return cb(err, user);
          }
        );
      }
    )
  );

  passport.serializeUser((user: User, done) => {
    done(null, user.discordId);
  });

  passport.deserializeUser((id: string, done) => {
    const user = getUser(id);
    done(null, user);
  });
}

function startServer() {
  const app = express();

  app.use(session({ secret: process.env["SECRET"]! }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "./views"));
  app.use("/static", express.static(path.join(__dirname, "../public")));
  app.use("/", loginRoutes);
  app.use("/auth", authRoutes);
  app.use("/form", formRoutes);
  app.use("/profile", profileRoutes);
  app.use("/profile-too-late", profileTooLateRoutes);
  app.use((_req, res, _next) => {
    res.statusCode = 404;
    res.render("404");
  });
  app.use((err: any, _req: Request, res: Response, _next: any) => {
    console.error(err.stack ?? err);
    res.statusCode = 500;
    res.render("500");
  });

  app.listen(process.env["PORT"]!, () => {
    console.log(`Listening on ${process.env["PORT"]}`);
  });
}

async function main() {
  loadEnv();
  await dbConnect();
  setupPassport();
  startServer();
}

main();
