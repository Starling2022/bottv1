module.exports.config = {
       name: "sinhnhatad",
       version: "1.0.0",
       hasPermssion: 0,
       credits: "Nguyễn An",
       description: "Đếm ngược tới ngày sinh nhật AdminBot",
       commandCategory: "other",
       cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("August 18, 2022 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`Còn ${days} ngày ${hours} tiếng ${minutes} phút ${seconds} giây là tới sinh nhật của AdminBot Nguyễn An`, event.threadID, event.messageID);
}