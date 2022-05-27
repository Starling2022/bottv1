module.exports.config = {
    name: "logout",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "HĐGN",
    description: "Đăng xuất",
    commandCategory: "admin",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event }){
    const permission = ["100004434344115"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới", event.threadID, event.messageID);
api.sendMessage("Đang đăng xuất...",event.threadID,event.messageID)
api.logout()
}
