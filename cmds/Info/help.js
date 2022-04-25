const { readdirSync, read } = require('fs');
const config = require('@Configs/main');

module.exports = {
    name: 'help',
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: 'Command Name',
            type: 'STRING',
            required: false
        }
    ],
    category: 'Info',
    description: 'Return a list of All Commands or Get Help for a Specified Command',
    ownerOnly: false,
    disabled: false,
    perms: ['None'],

    run: async (client, interaction) => {

        const row = new client.discord.MessageActionRow()
          .addComponents(
              new client.discord.MessageButton()
               .setLabel('Support Server')
               .setStyle('LINK')
               .setURL(`${config.supServer}`),
              new client.discord.MessageButton()
               .setLabel('Invite Link')
               .setStyle('LINK')
               .setURL(`${config.botInvite}`)
          );

          const commandInt = interaction.options.getString("command");

          if (!commandInt) {

            const infoCommands = [];
            readdirSync('./cmds/Info').forEach((file) => {
                const filen = require(`../../cmds/Info/${file}`);
                const name = `\`${filen.name}\``
                infoCommands.push(name);
            });

            const configCommands = [];
            readdirSync('./cmds/Config').forEach((file) => {
                const filen = require(`../../cmds/Config/${file}`);
                const name = `\`${filen.name}\``
                configCommands.push(name);
            });

            const twitterCommands = [];
            readdirSync('./cmds/Twitter').forEach((file) => {
                const filen = require(`../../cmds/Twitter/${file}`);
                const name = `\`${filen.name}\``
                twitterCommands.push(name);
            });

            const help_embed = new client.discord.MessageEmbed()
              .setTitle(`${client.user.username} - Help`)
              .setColor(`${client.embeds.color}`)
              .setThumbnail(`${client.embeds.footerIcon}`)
              .setDescription(`Hello **<@${interaction.member.id}>**, I am <@${client.user.id}>`)
              .addFields(
                  {
                      name: 'Help Usage',
                      value: 'Use: `/help <command_name>` to see some Info about that Command.'
                  },
                  {
                      name: 'Info Commands',
                      value: `${infoCommands.map((data) => `${data}`).join(", ")}`
                  },
                  {
                    name: 'Config Commands',
                    value: `${configCommands.map((data) => `${data}`).join(", ")}`
                },
                {
                    name: 'Twitter Commands',
                    value: `${twitterCommands.map((data) => `${data}`).join(", ")}`
                },
                  {
                      name: 'Total Commands',
                      value: `${client.slash.size}`
                  }
              )
              .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

              interaction.reply({ embeds: [help_embed], components: [row] });
          
          } else {

            const command = client.slash.get(commandInt.toLowerCase());

            if (!command) {
                interaction.reply({ content: `Command: ${commandInt} does not exist`});

            } else {

                let command = client.slash.get(commandInt.toLowerCase());

                let name = command.name;
                let description = command.description;
                let usage = command.usage;
                let category = command.category;
                let perms = command.perms;

                let cmd_help = new client.discord.MessageEmbed()
                 .setTitle(`\`${(name.toLocaleString())}\` - Help`)
                 .setColor(`${client.embeds.color}`)
                 .setThumbnail(`${client.embeds.footerIcon}`)
                 .addFields(
                     {
                         name: 'Description',
                         value: `${description}`
                     },
                     {
                         name: 'Permissions',
                         value: `${perms}`
                     },
                     {
                         name: 'Category',
                         value: `${category}`
                     },
                     {
                         name: 'Usage',
                         value: `${usage}`
                     }
                 )
                 .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

                 interaction.reply({ embeds: [cmd_help] });
            }
        }
    }
}