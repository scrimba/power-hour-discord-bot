#!/usr/bin/env node 

const Discord = require('discord.js')

const bot = new Discord.Client()
bot.login(process.env.POWER_HOUR_BOT_DISCORD_TOKEN)

bot.on('ready', async () => {

  try {

    const powerHourChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID) 

    const powerHourTextChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

    const message = await powerHourTextChannel.send("Power Hour OVER 👋")
    await message.react('👋')

    await powerHourChannel.overwritePermissions([
      {
        id: process.env.POWER_HOUR_BOT_EVERYONE_ROLE_ID,
        deny: ['CONNECT'],
      },
    ]);

    const promises = powerHourChannel.members.map(member => new Promise(async done => {
      await member.voice.kick()
      done()
    }))
    await Promise.all(promises)

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
