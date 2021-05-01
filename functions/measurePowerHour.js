const Discord = require('discord.js')

const bot = new Discord.Client()
bot.login(process.env.POWER_HOUR_BOT_DISCORD_TOKEN)

const points = { } 

bot.on('ready', async () => {
  try {
    const powerHourChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID) 

    setInterval(() => {
      const peeps = powerHourChannel
        .guild
        .voiceStates
        .cache
        .filter(user => user.channelID === process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID)
        .each(user => {
          if (!points[user.id]) {
            points[user.id]=1
          }
          points[user.id] += 1
          if (user.selfVideo) 
            points[user.id] += 1
          if (user.streaming) 
            points[user.id] += 1
        })
        console.log(points)
    }, 1000)

    // process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
