const {SlashCommandBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('Sends a message logging a user as suspicious')
    .addUserOption(option => option.setName('user').setDescription('The user you would like to log as blacklisted(Can be just an id)').setRequired(true))
    .addMentionableOption(option => option.setName('position').setDescription('The highest position the user held').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for logging this user as blacklisted').setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
  
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const position = interaction.options.getMentionable('position');
    
    // Checks if target is self or a bot
    if (user.bot || user.id === interaction.user.id)
      return await interaction.reply({
        content: 'Error: User can not be yourself or a bot\nContact a Developer if you believe this to be a mistake',
        ephemeral: true
      });
      
    // Checks if it has a position
    // Only roles can have this
    else if (!position.position)
      return await interaction.reply({
        content: 'Error: Position is not a role\nContact a Developer if you believe this to be a mistake',
        ephemeral: true
      });
    
    await interaction.reply(`# Blacklisted User Log\n**User**: <@${user.id}>\n**Username**: ${user.tag}\n**User ID**: ${user.id}\n**Position**: ${position.name}\n**Reason**: ${reason}`);
  }
}