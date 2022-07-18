const { Telegraf } = require("telegraf");
const fs = require("fs");
const axios = require("axios").default;
const slug = require("slug");

require("dotenv").config();

let rawdata = fs.readFileSync("province.json");
let provinces = JSON.parse(rawdata);

const token = process.env.TOKEN_TELEGRAM;

const bot = new Telegraf(token);

const appid = "ff532977349290d86ac2bc3243a8ca5a";

bot.start((ctx) => ctx.replyWithHTML("<i>Hello</i>"));
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("hipster", Telegraf.reply("a"));

bot.on("sticker", (ctx) => ctx.reply("👍"));


bot.hears("ok", (ctx) => ctx.reply("Hummm",{
    reply_markup:{
        inline_keyboard:[
            [
                {text :'👍Click medư', callback_data: 'one'},
                {text :'Click medưưq', callback_data: 'one2'},
            ]
            ,
            [
                {text :'👍Click medư', callback_data: 'one'},
                {text :'Click medưưq', callback_data: 'one2'},
                {text :'Click me34 👍', callback_data: 'one3'},
                {text :'Click me34 👍', callback_data: 'one3'},
                {text :'Click me34 👍', callback_data: 'one3'},
                {text :'Click me324', callback_data: 'one3'}
            ]
        ]
    }
}));

bot.action("one", (ctx) => {
    ctx.reply("clieck cái gì mà click");
});

bot.on("text", (ctx) => {
    
    const content = slug(ctx.update.message.text, " ");
    if (content.indexOf(slug("Thời tiết", " ")) >= 0) {
        const tinh = provinces.filter(
            (provi) => content.indexOf(slug(provi, " ")) >= 0
        );

        if (tinh.length > 0) {
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${slug(
                        tinh[0],
                        " "
                    )}&appid=${appid}`
                )
                .then(function (res) {
                    ctx.replyWithPhoto(
                        {
                            url: `https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png`,
                        },
                        {
                            caption: `Thời tiết:\n Nhiệt độ: ${parseInt(
                                res.data.main.temp - 273
                            )}"°"\n Độ ẩm: ${res.data.main.humidity}`,
                        }
                    );
                })
                .catch(function (error) {
                    ctx.replyWithHTML("lỗi tùi");
                });
        } else {
            ctx.reply("Không tìm thấy tỉnh thành bạn muốn xem");
        }
    } else {
        if(content.indexOf('may gio') >= 0){
            ctx.reply("Bây h là 10 h nè");
        }
        else {
            ctx.reply("Bạn nhắn tào lao gì vậy");
        }
    }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
