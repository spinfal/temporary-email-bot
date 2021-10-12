const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;

module.exports.run = async (client, message) => {
  if (message.author.bot) return;
    const helpEmbed = new MessageEmbed()
      .setTitle('Command List')
      .setDescription(`\`${prefix}help\` - shows this embed
\`${prefix}ping\` - returns the bot's ping and latency
\`${prefix}domains\` - returns a list of active domains
\`${prefix}make <1-10>\` - make a provided amount of emails
\`${prefix}inbox <email@domain.com>\` - shows the inbox for a provider email
\`${prefix}get <email@domain.com> <email ID>\` - gets a specific email from the inbox

**__Do not use these emails for anything important. Each inbox will be wiped periodically.__**`)
      .setTimestamp();
    return message.channel.send(helpEmbed);
}

module.exports.help = {
  name: "help"
}