const GuildDB = require('@Database/models/guilds');

module.exports = {
    name: 'list',
    usage: '/list',
    category: 'Info',
    description: 'List the Twitter Users this Guild is Subscribed too.',
    ownerOnly: false,
    disabled: false,
    perms: ['MANAGE_GUILD'],

    run: async (client, interaction) => {

        let guild = await GuildDB.findById(interaction.guild.id).exec();

        if (!guild) return interaction.reply({ content: 'This guild is not Subscribed to any Twitter Users' })
        if (!guild.handles) return interaction.reply({ content: 'This guild is not Subscribed to any Twitter Users' })

        else {

            const embed = new client.discord.MessageEmbed()
             .setTitle('Active Monitors')
             .setColor(`${client.embeds.color}`)
             .setThumbnail(`${client.embeds.footerIcon}`)
             .addFields(
                 {
                     name: 'Users',
                     value: `${guild.handles.map(u => `> ${u.name}`).join('\n')}`
                 },
                 {
                     name: 'Total',
                     value: `${guild.handles.length}`
                 }
             )
             .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

             return interaction.reply({ embeds: [embed] });
        }
    }
}