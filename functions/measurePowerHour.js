#!/usr/bin/env node 

// my ID: 425243762151915523
// powerhour ID: O837037926189105192
// plan
//    one point per minute in power hour
//    two point per minute if your camera OR screen is on
//    three point per minute if your camera AND screen are
//    on
//
//    i could count every 60 seconds 
//    or every 60 sconds per user
//      considering I don't think you can poll streaming: or
//      webcam: on, I doing it event-based and per-user
//      looks like a sensible option. It's also going to be
//      the most accurate
//


const Discord = require('discord.js')

const bot = new Discord.Client()
bot.login(process.env.POWER_HOUR_BOT_DISCORD_TOKEN)

bot.on('voiceStateUpdate', async (oldVoiceStatus, newVoiceStatus) => {
  console.log(`voiceStatus: ${JSON.stringify(oldVoiceStatus)} became ${JSON.stringify(newVoiceStatus)}`)

  const powerHourTextChannel = await bot
    .channels
    .fetch(process.env.POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

  if (newVoiceStatus.channel 
    && oldVoiceStatus.channel
    && newVoiceStatus.channel.id === oldVoiceStatus.channel.id) {
    // await powerHourTextChannel.send(`<@${newVoiceStatus.id}> changed their state`)

    if (!oldVoiceStatus.selfVideo & newVoiceStatus.selfVideo) {
      await powerHourTextChannel.send(`<@${newVoiceStatus.id}> turned their cam on woo hoo`)
    }
    if (oldVoiceStatus.selfVideo & !newVoiceStatus.selfVideo) {
      await powerHourTextChannel.send(`<@${newVoiceStatus.id}> turned their camera OFF`)
    }

    if (!oldVoiceStatus.streaming & newVoiceStatus.streaming) {
      await powerHourTextChannel.send(`<@${newVoiceStatus.id}> started streaming`)
    }

    if (oldVoiceStatus.streaming & !newVoiceStatus.streaming) {
      await powerHourTextChannel.send(`<@${newVoiceStatus.id}> stopped streaming!`)
    }

    return
  }

  if (newVoiceStatus.channel 
    && newVoiceStatus.channel.id === process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID) {
    console.log(`${newVoiceStatus.id} joined the power hour`)
    await powerHourTextChannel.send(`<@${newVoiceStatus.id}> joined`)
  }

  if (oldVoiceStatus.channel 
    && oldVoiceStatus.channel.id === process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID) {
    console.log(`${newVoiceStatus.id} left the power hour`)
    await powerHourTextChannel.send(`<@${newVoiceStatus.id}> left`)
  }

})

bot.on('ready', async () => {
  try {
    const powerHourChannel = await bot
      .channels
      .fetch(process.env.POWER_HOUR_BOT_VOICE_CHANNEL_ID) 

    // powerHourChannel.members.each(member => {
    //   console.log(member.build)
    // })

    // process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
