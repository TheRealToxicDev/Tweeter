require('module-alias/register');

const{ Client, Collection, Intents } = require('discord.js');
const Logger = require('@Handlers/logger');
const GuildDB = require('@Database/models/guilds');
const handler = require('@Handlers/client');
const { twitClient } = require('@Handlers/twit');
const config = require('@Configs/main');
const Discord = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});

module.exports = client;

client.discord = Discord;
client.slash = new Collection();
client.handles = new Collection();
client.embeds = require('@Configs/embed');
client.twit = require('@Configs/twit');
client.logChannels = [];
client.logger = Logger;
client.config = config;

handler.loadEvents(client);
handler.loadSlashCommands(client);
twitClient(client);

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});

client.login(config.disToken);