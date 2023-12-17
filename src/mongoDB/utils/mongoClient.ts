import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI;

let client = new MongoClient(uri!);
let clientPromise:  Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise;
} 
else {
  clientPromise = client.connect()
}

export default clientPromise
