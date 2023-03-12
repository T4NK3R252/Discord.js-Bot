const Discord = require('discord.js');
const fetch = require('node-fetch');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

const TOKEN = 'BOT-TOKEN-HERE';
client.login(TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    // Check if the message is from a bot or a human
    if (message.author.bot) return;
    
    // Check if the message starts with the command prefix
    if (message.content.startsWith('!coin') || message.content.startsWith('!c')) {
        // Get the cryptocurrency symbol or command from the message content
        const prefix = message.content.startsWith('!coin') ? '!coin' : '!c';
        const command = message.content.slice(prefix.length).trim();

        // Check if the user entered a number
        if (!isNaN(command)) {
            const limit = parseInt(command);
            if (limit < 1 || limit > 50) {
                message.reply('Please provide a number between 1 and 50.');
                return;
            }
            // Fetch data from the CoinCap API for top N cryptocurrencies by market cap
            const response = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}`);
            const data = await response.json();
            // Send the API data as a message to the user
            const topN = data.data.map(asset => `${asset.rank}. ${asset.name} ($${asset.priceUsd})`).join('\n');
            message.channel.send(`Top ${limit} cryptocurrencies by market cap:\n${topN}`);
        } else {
            // Fetch data from the CoinCap API for the given cryptocurrency
            const response = await fetch(`https://api.coincap.io/v2/assets/${command}`);
            const data = await response.json();
            // Check if the API returned an error
            if (data.error) {
                message.reply(`Error: ${data.error}`);
                return;
            }
            // Send the API data as a message to the user
            message.channel.send(`The price of ${data.data.name} is $${data.data.priceUsd}.`);
        }
    } else if (message.content === '!help' || message.content === '!h') {
        message.channel.send(`
        **Available commands:**
        !coin <name> - Get the price of a cryptocurrency with the given name
        !coin <number> - Get the top N cryptocurrencies by market cap (1-50)
        !coin all - Get the top 50 cryptocurrencies by market cap
        !purge <amount> - Deletes past messages with the given amount
        !help - Show this help message
        `);
    } else if (message.content.startsWith('!purge')) {
        // Check if the user has permission to manage messages
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.reply('You do not have permission to use this command.');
    return;
  }
  
  // Get the number of messages to delete
  const args = message.content.split(' ');
  const amount = parseInt(args[1]) + 1;
  
  // Check if the amount is a valid number
  if (isNaN(amount)) {
    message.reply('Please provide a valid number of messages to delete.');
    return;
  }
  
  // Delete the messages
  await message.channel.bulkDelete(amount);
  message.reply(`Successfully deleted ${amount - 1} messages.`);
}
});
