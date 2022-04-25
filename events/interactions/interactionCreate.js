module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error check console' });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== client.config.ownerID) {
                return interaction.reply({ content: "This command is locked to my Owner", ephemeral: true });
            }
        }

        if (command.disabled) {
            if (!client.config.devs.includes(interaction.user.id)) {
                return interaction.reply({ content: "This command has been Disabled by my Dev Team", ephemeral: true });
            }
        }

        if (command.perms && !interaction.member.permissions.has(command.perms)) {
            return interaction.reply({ content: `You need: \`${command.perms}\` to use this command!`});
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}