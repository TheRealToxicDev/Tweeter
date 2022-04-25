const Logger = require('@Handlers/logger');
const GuildDB = require('@Database/models/guilds');
const twitConfig = require('@Configs/twit');
const Twit = require('twit');

module.exports.twitClient = async (client) => {

    if (!twitConfig.API_KEY || twitConfig.API_KEY === '') 
    return Logger.sendLogs('Please provide a Twitter API Key in the Twit Config', 'error');

    if (!twitConfig.API_SECRET || twitConfig.API_SECRET === '') 
    return Logger.sendLogs('Please provide a Twitter API Secret in the Twit Config', 'error');

    if (!twitConfig.API_ACCESS_TOKEN || twitConfig.API_ACCESS_TOKEN === '') 
    return Logger.sendLogs('Please provide a Twitter API Access Token in the Twit Config', 'error');

    if (!twitConfig.API_TOKEN_SECRET || twitConfig.API_TOKEN_SECRET === '') 
    return Logger.sendLogs('Please provide a Twitter API Token Secret in the Twit Config', 'error');

    client.t = new Twit({
        consumer_key: twitConfig.API_KEY,
        consumer_secret: twitConfig.API_SECRET,
        access_token: twitConfig.API_ACCESS_TOKEN,
        access_token_secret: twitConfig.API_TOKEN_SECRET,
    });

    client.monitorTweets = async (update) => {

        let IDs = await GuildDB.find({});
        IDs = IDs.reduce((acc, g) => acc.concat(g.handles), [])
        IDs = Array.from(new Set(IDs)).map(h => h.id);

        const stream = client.t.stream('statuses/filter', { follow: IDs });

        if (!stream && !IDs.length) return;

        if (update || !IDs.length) stream.stop();

        stream.on('connect', (res) => {
            Logger.sendLogs('Attempting to Connect to the Twitter API!', 'client')
        });

        stream.on('connected', (res) => {
            Logger.sendLogs('Successfully Connected to the Twitter API', 'ready');
        });

        stream.on('tweet', async (tweet) => {

            let text = tweet.text.replace(/(http(s)?:\/\/)?t.co\/[a-zA-Z0-9]{10}/g, "")
            let media = tweet.extended_entities && tweet.extended_entities.media ? tweet.extended_entities.media : [];
            if(text && tweet.quoted_status) text += "\n\n";

            if (tweet.quoted_status) {
                text += `Retweeted: ${tweet.quoted_status.user.name} | Post: ${tweet.quoted_status.text}`;
                media.push(tweet.quoted_status.extended_entities.media);
                media = media.flat();
            }

            const tweet_embed = new client.discord.MessageEmbed()
              .setAuthor({ name: `${tweet.user.name}`, iconURL: `${tweet.user.profile_image_url}` })
              .setThumbnail(`${tweet.user.profile_image_url}`)
              .setURL(`https://twitter.com/${tweet.user.screen_name}`)
              .setColor(`${client.embeds.color}`)
              .setDescription(`${text}`)
              .addFields(
                  {
                      name: 'View Tweet',
                      value: `[**Click Here**](https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str})`
                  }
              )
              .setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })

            if (media.length) { 
                tweet_embed.setImage(`${media[0].media_url}`)
                if (media.length > 1) {
                    tweet_embed.addFields(
                        {
                            name: 'Images',
                            value: `${media.map(m => m.media_url)}`
                        }
                    )
                    tweet_embed.setFooter({ text: `${client.embeds.footerText}`, iconURL: `${client.embeds.footerIcon}` })
                }
            }

            let guilds = client.handles.get(tweet.user.screen_name);

            for(let id of guilds) {
            if (client.logChannels[id]) {
               client.logger.sendLogs('Successfully Updated a Subscription Channel!', 'event');
               client.channels.resolve(client.logChannels[id]).send({ embeds: [tweet_embed] });
            }
          }
        });
    };
};