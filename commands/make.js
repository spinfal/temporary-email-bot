const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
const maxEmails = config.maxEmails;

module.exports.run = async (client, message, args) => {
  if (args.length == 0) return;
  if (!isNaN(args[0]) && args[0] <= maxEmails) {
    fetch(`https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=${args[0]}`).then(res => res.json()).then(res => {
      for (let i = 0; i < res.length; i++) {
        message.channel.send(res[i])
      }
    });
  } else {
    const errorEmbed = new MessageEmbed()
      .setDescription(`The max emails you can make is ${maxEmails}`);
    return message.channel.send(errorEmbed);
  }
}

module.exports.help = {
  name: "make"
}