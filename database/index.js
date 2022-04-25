const mongoose = require('mongoose');
const config = require('@Configs/main');
const Logger = require('@Handlers/logger');

if (!config.mongoURI || !config.mongoURI === '')
Logger.sendLogs('Please define a Mongo Connection String in the Client Config', 'error');

module.exports = DBClient = async (URI) => {

    await mongoose.connect(URI, {
        family: 4,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,

    }).then(() => {

        Logger.sendLogs('Connected to the Database Successfully', 'ready');

    }).catch((e) => {
        
        Logger.sendLogs(`Failed to Connect to the Database: ${e.message}`, 'error');
    });
}