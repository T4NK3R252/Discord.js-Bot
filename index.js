const Discord = require('discord.js');
const fetch = require('node-fetch');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

const TOKEN = 'TOKEN';
client.login(TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    // Check if the message is from a bot or a human
    if (message.author.bot) return;
    
    // Check if the message starts with the command prefix
    if (message.content.startsWith('!coin')) {
        // Get the cryptocurrency symbol or command from the message content
        const command = message.content.slice(6);
        
        // Fetch data from the CoinCap API
        let response;
        let data;
        if (command === '10') {
            response = await fetch('https://api.coincap.io/v2/assets?limit=10');
            data = await response.json();
        } else if (command === 'all') {
            response = await fetch('https://api.coincap.io/v2/assets?limit=50')
            data = await response.json();
        } else {
            response = await fetch(`https://api.coincap.io/v2/assets/${command}`);
            data = await response.json();
        }
        
        // Check if the API returned an error
        if (data.error) {
            message.reply(`Error: ${data.error}`);
            return;
        }
        
        // Send the API data as a message to the user
        if (command === 'all') {
            const top = data.data.map(asset => `${asset.rank}. ${asset.name} ($${asset.priceUsd})`).join('\n');
            message.channel.send(`Top 50 cryptocurrencies by market cap:\n${top}`);
        } else if (command === '10') {
            const topTen = data.data.map(asset => `${asset.rank}. ${asset.name} ($${asset.priceUsd})`).join('\n');
            message.channel.send(`Top 10 cryptocurrencies by market cap:\n${topTen}`);
        } else {
            message.channel.send(`The price of ${data.data.name} is $${data.data.priceUsd}.`);
        }
    } else if (message.content === '!help') {
        message.channel.send(`
        **Available commands:**
        !coin <coin> - Get the price of a cryptocurrency with the given name
        !coin 10 - Get the top 10 cryptocurrencies by market cap
        !coin all - Get the top 50 cryptocurrencies by market cap
        !purge <amount> - delete past messages with the given amount
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

