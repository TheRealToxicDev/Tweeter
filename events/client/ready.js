const DBClient = require('@Database/index.js');
const GuildDB = require('@Database/models/guilds');
const { GuildEmojiRoleManager } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {

        await DBClient(client.config.mongoURI)
        
        // Puts an activity
        client.user.setActivity("with Tweets!", {
            type: "PLAYING",
            name: "with Tweets!"
        });

        await client.guilds.cache.forEach(async (g) => {
            
            const guild = await GuildDB.findById(g.id);

            if (!guild) {
                
                const defaultGuild = {
                    _id: g.id,
                    handles: [],
                    logChannel: 'none'
                }

                const newGuild = new GuildDB(defaultGuild);
                GuildDB.saveGuild(newGuild);
            
            } else {

                guild.handles.forEach(h => {
                    if (client.handles.has(h.name)) {
                        let guildIDs = client.handles.get(h.name);
                        guildIDs.push(g.id);
                        client.handles.set(h.name, guildIDs);
                    } else {
                        client.handles.set(h.name, [g.id]);
                    }
                });

                if (guild.logChannel != 'none') client.logChannels[g.id] = guild.logChannel;
            }
        });

        // Send a message on the console
        console.log(`[LOG] ${client.user.tag} is now online!`);
        
        client.monitorTweets(true)
    }
}