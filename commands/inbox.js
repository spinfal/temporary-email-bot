const { Discord, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  if (args.length < 1 || args.length > 1) return;
  if (args.length == 1) {
    const email = args[0].split('@');
    fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${email[0]}&domain=${email[1]}`).then(res => res.json()).then(res => {
      if (res.length > 0) {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
          const inboxEmbed = new MessageEmbed()
            .setTitle(`Inbox for ${args[0]}`)
            .setDescription(`**__Subject__**
${res[i].subject}
**__From__**
${res[i].from}`)
            .setFooter(`ID: ${res[i].id} | Date: ${res[i].date}`);
          message.channel.send(inboxEmbed);
        }
      } else {
        const errorEmbed = new MessageEmbed()
          .setDescription('This inbox is empty');
        return message.channel.send(errorEmbed);
      }
    }).catch(e => message.channel.send(e));
  }
}

module.exports.help = {
  name: "inbox"
}