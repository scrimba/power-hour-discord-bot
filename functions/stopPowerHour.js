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

    // await powerHourTextChannel.send("That is it folks, the power hour channel is over!")

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
    // await powerHourChannel.members.each(member => member.voice.kick())
    await Promise.all(promises)

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

})
