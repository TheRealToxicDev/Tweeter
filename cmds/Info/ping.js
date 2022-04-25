module.exports = {
    name: 'ping',
    category: 'Info',
    description: 'Check the bots Latency and Response Time',
    usage: '/ping',
    ownerOnly: false,
    disabled: false,
    perms: ['None'],

    run: async (client, interaction) => {

        const msg = await interaction.channel.send('🏓 Checking the Ping...');

        const embed = new client.discord.MessageEmbed()
          .setTitle('📈 Ping Results')
          .setColor(`${client.embeds.color}`)
          .setThumbnail(`${client.embeds.footerIcon}`)
          .addFields(
              {
                  name: 'Response Time',
                  value: `${Math.floor(msg.createdAt - interaction.createdAt)}ms`,
                  inline: true
              },
              {
                  name: 'Discord API',
                  value: `${client.ws.ping}ms`,
                  inline: true
              }
          )
          .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` });

          await interaction.reply({ embeds: [embed] })

          msg.delete();
    }
}