import { Db, MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI as string
const client = new MongoClient(uri)

let db: Db

function connect() {
    db = client.db(process.env.MONGODB_NAME)
    return db
}

export function getDB(): Db {
    if (!db) return connect()
    return db
}