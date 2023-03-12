# Discord Crypto Bot

A simple Discord bot that can fetch cryptocurrency data from the CoinCap API and display it in a Discord channel. It also includes a help command and a purge command to delete past messages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/discord-crypto-bot.git
```

2. Install the required packages:
```bash
npm install discord.js
npm install fetch
```

3. Set you Discord bot token in the '.env' file:
```env
DISCORD_TOKEN=your-bot-token-here
```
You can obtain a token for your bot from the [Discord Developer Portal](https://discord.com/developers/applications)

4. Start the bot:
```bash
npm start
```

## Usage

The bot responds to commands starting with the ! prefix. The available commands are:

### Commands

- `!coin [symbol | 10 | all]`: Returns the current price of a cryptocurrency with the given symbol or the top 10/50 cryptocurrencies by market cap.
- `!help`: Shows all available commands and how to use them.
- `!purge [number]`: Deletes the specified number of messages from the channel.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch with your changes: git checkout -b my-feature-branch
3. Make your changes and commit them: git commit -am 'Add some feature'
4. Push your branch to your fork: git push origin my-feature-branch
5. Create a new pull request.

## License

The project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
