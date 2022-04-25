const DBClient = require('@Database/index.js');
const GuildDB = require('@Database/models/guilds');

module.exports.guildSync = async (client) => {

    setInterval(async () => {

        try {

        await client.guilds.cache.forEach(async (g) => {

            const guild = await GuildDB.findById(g.id);

            if (!guild) {
                const defaultGuild = {
                    _id: g.id,
                    handles: [],
                    logChannel: 'none'
                }

                const newGuild = new GuildDB(defaultGuild);

                GuildDB.saveGuild(newGuild)
            
            } else {

                guild.handles.forEach(h => {
                    if (client.handles.has(h.name)) {
                        let guildIDs = client.handles.get(h.name);
                        guildIDs.push(g.id);
                        client.handles.set(h.name, guildIDs);
                    }
                });

                if (guild.logChannel != 'none') client.logChannels[g.id] = guild.logChannel;
            }
        })
       } catch(e) {
           return client.logger.sendLogs(`Failed to Sync Guild Database and Client Handles: ${e.stack}`, 'error')
      }
    }, 5000)
}