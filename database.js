const mongoose = require('mongoose');

async function ConnectDB()
{
    const uri = process.env.MONGO_URI;
    const dbname = process.env.DB_NAME;
    if(!uri || !dbname)
    {
        console.log("Connection to db not successful.Set URI and DBNAME in env file");
    }
    await mongoose.connect(uri,{dbname});
    console.log("Connected to Database : ",dbname);
}
async function DisconnectDB()
{
    const dbname = process.env.DB_NAME;
    await mongoose.disconnect();
    console.log("Disconnected from Database:",dbname);
}
module.exports = {ConnectDB,DisconnectDB};