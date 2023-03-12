# Discord Crypto Bot
A simple Discord bot that can fetch cryptocurrency data from the CoinCap API and display it in a Discord channel. It also includes a help command and a purge command to delete past messages.

Installation
Clone this repository:

bash
Copy code
git clone https://github.com/your-username/discord-crypto-bot.git
Install the required packages:

bash
Copy code
npm install
Set your Discord bot token in the .env file:

env
Copy code
DISCORD_TOKEN=your-bot-token-here
You can obtain a token for your bot from the Discord Developer Portal.

Start the bot:

bash
Copy code
npm start
Usage
The bot responds to commands starting with the ! prefix. The available commands are:

!help: Displays the list of available commands and how to use them.
!coin <symbol|10|all>: Fetches cryptocurrency data from the CoinCap API and displays it in a Discord channel. The symbol argument is the symbol of the cryptocurrency you want to fetch (e.g., BTC for Bitcoin), 10 shows the top 10 cryptocurrencies by market cap, and all shows the top 50 cryptocurrencies by market cap.
!purge <amount>: Deletes the given amount of past messages from the channel. The amount argument must be an integer between 1 and 100.
Contributing
If you want to contribute to this project, please follow these steps:

Fork this repository.
Create a new branch with your changes: git checkout -b my-feature-branch
Make your changes and commit them: git commit -am 'Add some feature'
Push your branch to your fork: git push origin my-feature-branch
Create a new pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
