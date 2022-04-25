const { Schema, model } = require('mongoose');
const Logger = require('@Handlers/logger');

module.exports = model('guilds', new Schema({
    _id: String,
    handles: [Object],
    logChannel: String
}));

module.exports.saveGuild = function(guildDB) {
    return new Promise((resolve, reject) => {
        guildDB.save().then(db => {
            resolve(db);
        }).catch(err => {
            Logger.sendLogs(`Error Updating Guild DB: ${err.stack}`, 'error');
            reject(err);
        })
    })
}