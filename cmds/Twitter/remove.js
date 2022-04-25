const GuildDB = require('@Database/models/guilds');

module.exports = {
    name: 'remove',
    usage: '/remove <UserHandle> || Ex: /remove TheRealToxicDev',
    category: 'Twitter',
    description: 'UnSubscribe from Updates for a Twitter User.',
    ownerOnly: false,
    disabled: false,
    perms: ['MANAGE_GUILD'],
    options: [
        {
            name: 'username',
            description: 'The Users Twitter Handle.',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        let user = interaction.options.getString('username')

        let guild = await GuildDB.findById(interaction.guild.id).exec();

        let index = guild.handles.findIndex(h => h.name.toLowerCase() == user || h.username.toLowerCase() == user);

        if (index != -1) {

            let name = guild.handles[index].name;

            guild.handles.splice(index, 1);

            let guilds = client.handles.get(name);

            guilds.splice(guilds.indexOf(interaction.guild.id), 1);

            client.handles.set(name, guilds);
        }

        const embed = new client.discord.MessageEmbed()
         .setTitle('New Subscription')
         .setThumbnail(`${client.embeds.footerIcon}`)
         .setColor(`${client.embeds.color}`)
         .setDescription(`Removed the Monitor for: ${user}`)
         .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

        interaction.reply({ embeds: [embed] });

        await GuildDB.saveGuild(guild).catch(err => client.logger.sendLogs(`Error Removing Subscription: ${err.stack}`, 'error'))

        client.monitorTweets(true);
    }
}