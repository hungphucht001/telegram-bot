const { Telegraf } = require('telegraf')
require('dotenv').config();

const token = process.env.TOKEN_TELEGRAM

const bot = new Telegraf(token)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('a'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('amireux.asia'))
bot.on('text', (ctx) => ctx.reply('Sent a message to the server'))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))