import { User } from "./user";
import { usersCollection } from "../db";
import corwcastEmails from "../../crowdcast-emails.json";
import karuraSnapshot from "../../karura-users.json";
import axios from "axios";

export async function getUser(id: string) {
  if (usersCollection) {
    const user = await usersCollection.findOne({ id: id });
    return user;
  } else {
    throw "DB not connected";
  }
}

export async function getOrCreateUser(
  { id, discordUsername }: User,
  cb: (err: Error | null, user: User | undefined) => void
) {
  try {
    const user = await getUser(id!);
    if (user) {
      return cb(null, {
        id: (user as User).id,
        discordUsername: (user as User).discordUsername,
      });
    } else {
      const insertedAt = new Date();
      const resp = await usersCollection!.insertOne({
        id,
        discordUsername,
        insertedAt,
        updatedAt: insertedAt,
      });

      if (resp.acknowledged) {
        return cb(null, {
          id,
          discordUsername,
        });
      } else {
        return cb(Error("Unable to create new user"), undefined);
      }
    }
  } catch (err) {
    return cb(err as Error, undefined);
  }
}

export async function updateUser(id: string,discordUsername:string, karuraAddress:string, karuraCrowdLoanAddress:string, email: string, telegramUser:string) {
  email = email.toLocaleLowerCase();
  if (usersCollection) {
    const updatedAt = new Date();
    const crowdcastParticipant = corwcastEmails.find(
      (crowdcastEmail) => crowdcastEmail.toLocaleLowerCase() === email
    )
      ? true
      : false;

    const inKaruraSnapshot = karuraSnapshot.find(
      (karuraAddress) => karuraAddress === karuraAddress
    )
      ? true
      : false;

    const data = JSON.stringify({
      query: `query { account(id: "${karuraCrowdLoanAddress}") { id } }`,
      variables: {},
    });

    const queryResponse = await axios(
      "https://api.subquery.network/sq/brettkolodny/mandala-stable-asset-users",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      }
    );

    const mission1Complete = queryResponse.data.data.account != null;

    const resp = await usersCollection.updateOne(
      { id },
      {
        $set: {
          email,
          discordUsername,
          karuraAddress,
          karuraCrowdLoanAddress,
          telegramUser,
          updatedAt,
          crowdcastParticipant,
          inKaruraSnapshot,
          mission1Complete,
        },
      }
    );

    if (resp.acknowledged) {
      return true;
    } else {
      return false;
    }
  } else {
    console.error("DB not connected");
    return false;
  }
}
