import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class MongoConfig {
  public static async start(isTestMode: boolean) {
    if (!isTestMode) {
      const uri = process.env.MONGO_URI;

      await mongoose.connect(uri);

      console.log('Connected to MongoDB');
    } else {
      const mongod = await MongoMemoryServer.create();

      const uri = mongod.getUri();

      await mongoose.connect(uri);
    }
  }
}
