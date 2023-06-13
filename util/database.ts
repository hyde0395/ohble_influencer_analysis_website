import { MongoClient, MongoClientOptions } from "mongodb";

const url =
  "mongodb+srv://akfmzh1207:akfmzh7979@eunhak.ht8sbkz.mongodb.net/?retryWrites=true&w=majority";
const options: MongoClientOptions = {};
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongo) {
    (global as any)._mongo = new MongoClient(url, options).connect();
  }
  connectDB = (global as any)._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
