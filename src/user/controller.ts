import { User } from "./user";
import { usersCollection } from "../db";
import axios from "axios";

// find by id discord
export async function getUser(id: string) {
  if (usersCollection) {
    const user = await usersCollection.findOne({ discordId: id });
    return user;
  } else {
    throw "DB not connected";
  }
}

export async function getByTwitterAddress(id: string) {
  if (usersCollection) {
    const user = await usersCollection.findOne({ twitterLink: id });
    return user;
  } else {
    throw "DB not connected";
  }
}

export async function getByAcalaAddress(id: string) {
  if (usersCollection) {
    const user = await usersCollection.findOne({ acalaAddress: id });
    return user;
  } else {
    throw "DB not connected";
  }
}

export async function getByKaruraAddress(id: string) {
  if (usersCollection) {
    const user = await usersCollection.findOne({ karuraAddress: id });
    return user;
  } else {
    throw "DB not connected";
  }
}

export async function getByEmail(id: string) {
  if (usersCollection) {
    const user = await usersCollection.findOne({ email: id });
    return user;
  } else {
    throw "DB not connected";
  }
}

export async function getOrCreateUser({ discordId, discordUsername }: User,
  cb: (err: Error | null, user: User | undefined) => void
) {
  try {
    const user = await getUser(discordId!);
    if (user) {
      return cb(null, {
        discordId: (user as User).discordId,
        discordUsername: (user as User).discordUsername,
      });
    } else {
      const insertedAt = new Date();
      const resp = await usersCollection!.insertOne({
        discordId: discordId,
        discordUsername,
        insertedAt,
        updatedAt: insertedAt,
        acalaAddress: '',
        email: '',
        twitterLink: '',
        emailMission: '',
        twitterMission: '',
        missionXp: 0,
        existingXp: 0,
        totalXp: 0,
        inServer: 0,
        role: ''
      });

      if (resp.acknowledged) {
        return cb(null, {
          discordId,
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

export async function updateUser(discordId: string,discordUsername:string, acalaAddress:string, twitterLink:string, email: string) {
  email = email.toLocaleLowerCase();
  if (usersCollection) {
    const updatedAt = new Date();

    // const data = JSON.stringify({
    //   query: `query { account(discordId: "${idDiscord}") { id } }`,
    //   variables: {},
    // });

    // const queryResponse = await axios(
    //   "https://api.subquery.network/sq/brettkolodny/mandala-stable-asset-users",
    //   {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data,
    //   }
    // );

    //const mission1Complete = queryResponse.data.data.account != null;
    let missionStatus,
    emailMission,
    twitterMission,
    missionXp,
    existingXp,
    totalXp,
    isInServer =  false,
    role = '0';

    let insertedAt =new Date();

    const resp = await usersCollection.updateOne(
      { discordId },
      {
        $set: {
          discordId,
          discordUsername,
          insertedAt,
          updatedAt,
          acalaAddress,
          email,
          twitterLink,
          emailMission,
          twitterMission,
          missionXp,
          existingXp,
          totalXp,  
          isInServer,
          role
        },
      }
    );
    console.log("RISPOSTA"+JSON.stringify(resp));

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
