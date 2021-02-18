#!/usr/bin/env node 

const Discord = require('discord.js')

const bot = new Discord.Client()
bot.login(process.env.POWER_HOUR_BOT_DISCORD_TOKEN)

bot.on('ready', async () => {
  try {
    const powerHourTextChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

    await powerHourTextChannel.send(`<@&${process.env.POWER_HOUR_PEEPS_ROLE_ID}> Power Hour launching in T-01:00:00 🚀`)
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
