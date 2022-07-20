import { Collection, Db, MongoClient } from "mongodb";
import path from "path";

export let usersCollection: Collection | undefined;

export async function connect() {
  const uri = `${process.env["DB_URI"]!}`
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("taigaEventMongo");
    usersCollection = db.collection("user");
  } catch {
    console.error("Unable to connect to DB"+client.connect());
  }
}
