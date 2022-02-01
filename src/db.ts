import { Collection, MongoClient } from "mongodb";
import path from "path";

export let usersCollection: Collection | undefined;

export async function connect() {
  const cert_path = path.join(__dirname, "../ca-certificate.cer");
  const uri = `${process.env["DB_URI"]!}=${cert_path}`
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("taiga-event");
    usersCollection = db.collection("users");
  } catch {
    console.error("Unable to connect to DB");
  }
}
