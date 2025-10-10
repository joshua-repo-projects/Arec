import { Db, MongoClient } from "mongodb";

const uri: string = 'mongodb+srv://mongodb:mongodb@cluster0.ovmxxzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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