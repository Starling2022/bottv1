module.exports.config = {
 	name: "autobanbox",
 	version: "1.0.0",
 	hasPermssion: 0,
 	credits: "NTKhang",
 	description: "tự động cấm nhóm dùng bot nếu spam bot 10 lần/phút",
 	commandCategory: "system",
 	usages: "",
 	cooldowns: 5
 };
 
 module.exports.run = ({api, event}) => {
   api.sendMessage("auto ban thread nếu spam bot", event.threadID, event.messageID);
 };
 
 module.exports.handleEvent = async ({ Threads, api, event}) => {
   const fs = require("fs-extra");
   const moment = require("moment-timezone");
   
   let { senderID, messageID, threadID } = event;
   const so_lan_spam = 5; // số lần spam, vượt quá sẽ bị ban
   const thoi_gian_spam = 60000; // 60000 millisecond (1 phút)
   const unbanAfter = 600000; // 600000 millisecond (10 phút) 
   const folderRandomImage = __dirname + "/cache/randomImgAutobanThread";
   const allImage = fs.readdirSync(folderRandomImage);
   if (!global.client.autobanthread) global.client.autobanthread = {};
   
   if (!global.client.autobanthread[threadID]) {
     global.client.autobanthread[threadID] = {
       timeStart: Date.now(),
       number: 0
     }
   };
 // FIX