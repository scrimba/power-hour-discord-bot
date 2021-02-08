const Discord = require('discord.js')

const bot = new Discord.Client()
bot.login(process.env.POWER_HOUR_BOT_DISCORD_TOKEN)

bot.on('ready', async () => {
  try {
    const powerHourTextChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

    powerHourTextChannel.send("Hello, I am a bot. Sometimes I send test messages")
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
