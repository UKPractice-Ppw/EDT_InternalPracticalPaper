require('dotenv').config();
const {ConnectDB,DisconnectDB} = require('./config/database');
const {LibraryService} = require('./services/library.service');

async function main()
{
    try
    {
        await ConnectDB();
        await LibraryService();
    }
    catch(error)
    {
        console.log("There was an Error: ",error);
        process.exitCode = 1;
    }
    finally
    {
        await DisconnectDB();
    }
}
main();