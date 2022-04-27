<img width="150" height="150" align="left" style="float: left; margin: 0 10px 10px 0;" alt="Tweeter" src="https://cdn.discordapp.com/attachments/653733403841134600/967953913754042428/Tweeter.jpeg">

<h1 style="color: #EF314B;">Tweeter</h1>
A Discord Bot that allows you to Subscribe to a Twitter Users Tweets and send them to a Discord Channel

<a href='https://infinitybotlist.com/bots/967948529593122857' title='widget'> <img src='https://infinitybotlist.com/bots/967948529593122857/widget?size=large'></img></a>

---

## Tech List
- Discord.js (v13.6.0)
- Mongoose (v6.0.12)
- Twitter API
- Twit (v2.2.11)

---

## Self Hosting
1. Download or Fork this Repo
2. Extract the Files to a Destination on your PC
3. Open the Files in a Editor/IDE of your choice

- Run `npm install` to install Dependencies
- Run `npm run dev` to run the Bot in Development
- Run `npm start` to run the Bot in Production 

---

## Config Setup
1. Open [configs/embed](./configs/embed.js) and Edit the Values.
2. Open [configs/main](./configs/main.js) and Edit the Values.
3. Open [configs/twit](./configs/twit.js) and Edit the Values.

- Values are explained below.

---

## Config Values

### Embed Config

```js
color: '', // Embed Footer Color should be a Hex
footerText: '', // Embed Footer Content should be a String
footerIcon: '' // Embed Thumbnail and Footer Image should be a PNG
```

### Main Config

```js
clientID: '', // Discord Client ID
disToken: '', // Discord Client Token
botInvite: '', // Discord Client Invite
supServer: '', // Support Server Invite
ownerID: '', // Client Owner ID
mongoURI: '', // Mongo Connection String
devs: [ // Array of Developer IDs
  ''
]
```

### Twit Config

```js
API_KEY: '', // Twitter API Key
API_SECRET: '', // Twitter API Secret
API_ACCESS_TOKEN: '', // Twitter Access Token
API_TOKEN_SECRET: '' // Twitter Access Token Secret
```

- Obtaining the Twitter API Keys, Tokens and Secrets can be done from [Twitter Dev Portal](https://developer.twitter.com/en/portal/dashboard)
- Obtaining the Client Token and ID can be Done from [Discord Dev Portal](https://discord.com/developers/applications)

---

## Support
If you need support you can contact me [here](https://linkcord.bio/discord) in the Discord Server for my Main Project or via the [Discussions](https://github.com/TheRealToxicDev/Tweeter/discussions) Section of this Repo

