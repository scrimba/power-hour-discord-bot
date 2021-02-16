const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' })

const cmd = process.argv[2]
if (cmd.indexOf('..') > -1) {
    console.log('No peeking outside of this repo!')
}
require(`./functions/${cmd}.js`)
