import { connectDB } from "@component/util/database";
import { WithId, Document } from "mongodb";

export default async function handler(
  요청: {
    body: any;
    method: string;
  },
  응답: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: string | WithId<Document>[]): any; new (): any };
    };
  }
) {
  let db = (await connectDB).db("user");

  if (요청.method == "POST") {
    // console.log(요청.body);
    let result = await db.collection("info").insertOne(JSON.parse(요청.body));
    return 응답.status(200).json("처리완료");
  }
  if (요청.method == "GET") {
    let result = await db.collection("info").find().toArray();
    return 응답.status(200).json(result);
  }
}
