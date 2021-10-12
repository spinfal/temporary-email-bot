const { Discord, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  if (args.length < 2 || args.length > 2) return;
  if (args.length == 2) {
    const email = args[0].split('@');
    fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${email[0]}&domain=${email[1]}&id=${args[1]}`).then(res => res.json()).then(res => {
      const getMessage = new MessageEmbed()
        .setTitle(`Inbox for ${args[0]}`)
            .setDescription(`**__Subject__**
${res.subject}
**__From__**
${res.from}
**__Message__**
\`\`\`
${res.textBody}
\`\`\``)
        .setFooter(`ID: ${res.id} | Date: ${res.date}`);
          message.channel.send(getMessage);
    }).catch(e => message.channel.send(e));
  }
}

module.exports.help = {
  name: "get"
}