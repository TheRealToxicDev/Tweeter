const util = require('util');

module.exports = {
    name: 'eval',
    usage: '/eval <code>',
    options: [
        {
            name: 'code',
            description: 'Code to Evaluate',
            type: 'STRING',
            required: true
        }
    ],
    category: 'Owner',
    description: 'Evaluate some Code!',
    ownerOnly: true,
    disabled: false,
    perms: ['None'],

    run: async (client, interaction) => {

        try {

        const str = interaction.options.getString('code')

        let evaled = util.inspect((await eval(str)));

        const eval_embed = new client.discord.MessageEmbed()
         .setTitle('Eval Results')
         .setThumbnail(`${client.embeds.footerIcon}`)
         .setColor(`${client.embeds.color}`)
         .addFields(
             {
                 name: 'Input',
                 value: `\`\`\`js\n ${str} \`\`\``
             },
             {
                 name: 'Output',
                 value: `\`\`\`js\n ${await evaled} \`\`\``
             },
             {
                 name: 'Type of',
                 value: `\`\`\`js\n ${await typeof(evaled)} \`\`\``
             }
         )
         .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

         await interaction.reply({ embeds: [eval_embed] });

        } catch (e) {

            const err_embed = new client.discord.MessageEmbed()
             .setTitle('Eval Error')
             .setColor('RED')
             .setDescription(`Error: ${e.message}`)
             .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

             return interaction.reply({ embeds: [err_embed] });
        }
    }
}