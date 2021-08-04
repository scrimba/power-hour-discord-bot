require('dotenv').config()
const cron = require('node-cron')
const Discord = require('discord.js')

const {
  POWER_HOUR_BOT_DISCORD_TOKEN,
  POWER_HOUR_BOT_VOICE_CHANNEL_ID,
  POWER_HOUR_BOT_TEXT_CHANNEL_ID,
  POWER_HOUR_BOT_SUBSCRIBED_TO_NOTIFICATIONS_ROLE_ID,
  POWER_HOUR_BOT_EVERYONE_ROLE_ID,
  POWER_HOUR_BOT_ONBOARDED_ROLE_ID
} = process.env

const bot = new Discord.Client()
bot.login(POWER_HOUR_BOT_DISCORD_TOKEN)

bot.on('ready', async () => {
  cron.schedule('0 9 * * 1-5', notify)
  cron.schedule('0 10 * * 1-5', start)
  cron.schedule('0 11 * * 1-5', stop)

  cron.schedule('0 13 * * 1-5', notify)
  cron.schedule('0 14 * * 1-5', start)
  cron.schedule('0 15 * * 1-5', stop)

  cron.schedule('0 17 * * 1-5', notify) 
  cron.schedule('0 18 * * 1-5', start)
  cron.schedule('0 19 * * 1-5', stop)

  cron.schedule('0 21 * * 1-5', notify)
  cron.schedule('0 22 * * 1-5', start)
  cron.schedule('0 23 * * 1-5', stop)
})

const start = async () => {
  const powerHourChannel = await bot
    .channels
    .fetch(POWER_HOUR_BOT_VOICE_CHANNEL_ID) 

  const powerHourTextChannel = await bot
    .channels
    .fetch(POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

  await powerHourTextChannel.send(`<@&${POWER_HOUR_BOT_SUBSCRIBED_TO_NOTIFICATIONS_ROLE_ID}> Screensharing or webcam on, microphone muted, let's focus! Power Hour starts NOW`)

  await powerHourChannel.overwritePermissions([
    {
      id: POWER_HOUR_BOT_EVERYONE_ROLE_ID,
      deny: ['VIEW_CHANNEL'],
    },
    {
      id: POWER_HOUR_BOT_ONBOARDED_ROLE_ID,
      allow: ['CONNECT', 'VIEW_CHANNEL'],
      deny: ['SPEAK'],
    }
  ])
}

const stop = async () => {
  const powerHourChannel = await bot
    .channels
    .fetch(POWER_HOUR_BOT_VOICE_CHANNEL_ID) 

  const powerHourTextChannel = await bot
    .channels
    .fetch(POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

  const message = await powerHourTextChannel.send("Power Hour OVER 👋")
  await message.react('💯')
  await powerHourTextChannel.send("⚠️  Learn more about the power hour and NEW POWER HOUR TIMES: https://scrimba.com/powerhour  ")

  await powerHourChannel.overwritePermissions([
    {
      id: POWER_HOUR_BOT_ONBOARDED_ROLE_ID,
      allow: ['VIEW_CHANNEL'],
      deny: ['CONNECT'],
    },
    {
      id: POWER_HOUR_BOT_EVERYONE_ROLE_ID,
      deny: ['VIEW_CHANNEL'],
    }
  ]);

  const promises = powerHourChannel.members.map(member => new Promise(async done => {
    await member.voice.kick()
    done()
  }))
  await Promise.all(promises)
}


const notify = async() => {
  const powerHourTextChannel = await bot
    .channels
    .fetch(POWER_HOUR_BOT_TEXT_CHANNEL_ID) 

  await powerHourTextChannel.send(`<@&${POWER_HOUR_BOT_SUBSCRIBED_TO_NOTIFICATIONS_ROLE_ID}> Power Hour launching in T-01:00:00 🚀`)
}
