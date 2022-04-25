const GuildDB = require('@Database/models/guilds');

module.exports = {
    name: 'add',
    usage: '/add <UserHandle> || Ex: /add TheRealToxicDev',
    category: 'Twitter',
    description: 'Subscribe to Updates from a Twitter User.',
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

    try {    

        let guild = await GuildDB.findById(interaction.guild.id).exec();
        let user = interaction.options.getString('username');

    client.t.get('users/show', { screen_name: user }, findUser);

      async function findUser(err, userData, response) {

        if (err) return interaction.reply({ content: `Error Subscribing: ${err.message}` });

        if (!guild.handles.find(h => h.name == userData.screen_name)) {

            guild.handles.push({ name: userData.screen_name, username: userData.name, id: userData.id_str });

            let guilds = client.handles.get(userData.screen_name) || []
            guilds.push(interaction.guild.id);

            client.handles.set(userData.screen_name, guilds);
        }

        const embed = new client.discord.MessageEmbed()
         .setTitle('New Subscription')
         .setColor(`${client.embeds.color}`)
         .setThumbnail(`${client.embeds.footerIcon}`)
         .setDescription(`Monitoring Tweets for: ${userData.name}`)
         .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

         interaction.reply({ embeds: [embed] });

         await GuildDB.saveGuild(guild).catch(async (e) => {
             await interaction.reply({ content: `Error Saving Subscription: ${e.message}`});
             return client.logger.sendLogs(`Error Saving Subscription: ${e.stack}`, 'error')
         })

         client.monitorTweets(true);
      }
   } catch (e) {
       interaction.reply({ content: `Error Occurred: ${e.message}` });
   }
  }
}