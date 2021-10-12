const { Discord, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  if (args.length > 0) return;
    fetch(`https://www.1secmail.com/api/v1/?action=getDomainList`).then(res => res.json()).then(res => {
      const activeDomains = res.length;
      
      if (activeDomains > 0) {
        const domainList = new MessageEmbed()
          .setTitle(`${activeDomains} ${(activeDomains == 1) ? 'domain' : 'domains'}`)
          .setDescription(res.join('\n'))
          .setTimestamp();
        return message.channel.send(domainList);
      } else {
        const errorEmbed = new MessageEmbed()
          .setDescription('There are no active domains, check back later.');
        return message.channel.send(errorEmbed);
      }
    }).catch(e => message.channel.send(e));
}

module.exports.help = {
  name: "domains"
}