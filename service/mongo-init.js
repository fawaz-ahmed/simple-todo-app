/* eslint-disable no-undef */
// ref: https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up
conn = new Mongo();
db = conn.getDB(process.env.DB_NAME)
db.createUser({
    user: process.env.DB_USERNAME,
    pwd: process.env.DB_PASSWORD,
    roles: [
        {
            role: "readWrite",
            db: process.env.DB_NAME
        }
    ]
});
db.createCollection(process.env.DB_COLLECTION);
db.setLogLevel(1);
