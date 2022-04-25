const GuildDB = require('@Database/models/guilds');

module.exports = {
    name: 'logs',
    usage: '/logs <channel>',
    category: 'Config',
    description: 'Set the Channel to send Tweet Updates too.',
    ownerOnly: false,
    disabled: false,
    perms: ['MANAGE_GUILD'],
    options: [
        {
            name: 'channel',
            description: 'Channel that you want to Log Tweets to.',
            type: 'CHANNEL',
            required: true,
            channelTypes: ['GUILD_TEXT']
        }
    ],

    run: async (client, interaction) => {

        let channel = interaction.options.getChannel('channel')?.id;

        let guild = await GuildDB.findById(interaction.guild.id).exec();

      //if (guild) {

        guild.logChannel = channel;

        client.logChannels[interaction.guild.id] = channel;

        await GuildDB.saveGuild(guild).catch((e) => {
            return interaction.reply({ content: `Error Updating Logs Channel: ${e.message}`});
        });

        const embed = new client.discord.MessageEmbed()
         .setTitle('Config: Set Logs')
         .setColor(`${client.embeds.color}`)
         .setThumbnail(`${client.embeds.footerIcon}`)
         .setDescription(`Okay, From now on i will send Tweet Updates to the <#${channel}> channel.`)
         .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

        return interaction.reply({ embeds: [embed] });
    }
}