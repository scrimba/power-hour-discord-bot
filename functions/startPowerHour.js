#!/usr/bin/env node 

const Discord = require('discord.js')

const bot = new Discord.Client()
bot.login(process.env.POWER_HOUR_BOT_DISCORD_TOKEN)

const multiLinedMessage = `Hello, @PowerHourPeeps 👋

Screensharing or webcam on, microphones off, let's focus! The Power Hour begins NOW`

bot.on('ready', async () => {
  try {
    const powerHourChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID) 

    const powerHourTextChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_TEXT_CHANNEL_ID) 
    await powerHourTextChannel.send(multiLinedMessage)

    await powerHourChannel.overwritePermissions([
      {
        id: process.env.POWER_HOUR_BOT_EVERYONE_ROLE_ID,
        allow: ['CONNECT'],
        deny: ['SPEAK'],
      },
    ]);

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
