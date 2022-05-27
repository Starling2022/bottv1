module.exports.config = {
    name: "english",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nghĩa mod",
    description: "Cấu trúc tiếng anh",
    commandCategory: "general",
    usages: "english",
    cooldowns: 5,
    dependencies: {
        "request":"",
        "fs-extra":""
    }
};


module.exports.handleReply = async function({ api, event, handleReply, client }) {
const request = global.nodemodule["request"];
const { createWriteStream, createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
var link = "";
var msg = "";
    switch(handleReply.type) {
        case "english": {
            switch(event.body) {
                case "1":/*Thì hiện tại đơn*/ link = "https://i.imgur.com/9gIFkIS.jpg"; msg = "Thì hiện tại đơn của bạn đây!"; break;
                case "2":/*Thì hiện tại tiếp diễn*/ link = "https://i.imgur.com/qMcOQXr.jpg"; msg = "Thì hiện tại tiếp diễn của bạn đây!"; break;
                case "3":/*Thì hiện tại hoàn thành*/ link = "https://i.imgur.com/ofUIXYC.jpg"; msg = "Thì hiện tại hoàn thành của bạn đây!"; break;
                case "4":/*Thì hiện tại hoàn thành tiếp diễn*/ link = "https://i.imgur.com/k175FAm.png"; msg = "Thì hiện tại hoàn thành tiếp diễn của bạn đây!"; break;
                case "5":/*Thì quá khứ đơn*/ link = "https://i.imgur.com/aoyaszV.jpg"; msg = "Thì quá khứ đơn của bạn đây!"; break;
                case "6":/*Thì quá khứ tiếp diễn*/ link = "https://i.imgur.com/Y5s4rvz.jpg"; msg = "Thì quá khứ tiếp diễn của bạn đây!"; break;
                 case "7":/*Thì quá khứ hoàn thành*/ link = "https://i.imgur.com/PBuXWlZ.jpg"; msg = "Thì quá khứ hoàn thành của bạn đây!"; break;
                 case "8":/*Thì quá khứ hoàn thành tiếp diễn*/ link = "https://i.imgur.com/XmOLofo.png"; msg = "Thì quá khứ hoàn thành tiếp diễn của bạn đây!"; break;
                 case "9":/*Thì tương lai đơn*/ link = "https://i.imgur.com/T6g5wDr.jpg"; msg = "Thì tương lai đơn của bạn đây!"; break;
                 case "10":/*Thì tương lai tiếp diễn*/ link = "https://i.imgur.com/8mvMDHr.jpg"; msg = "Thì tương lai tiếp diễn của bạn đây!"; break;
                 case "11":/*Thì tương lai gần*/ link = "https://i.imgur.com/T6g5wDr.jpg"; msg = "Thì tương lai gần của bạn đây!"; break;
                 case "12":/*Thì tương lai hoàn thành*/ link = "https://i.imgur.com/w0oVig3.jpg"; msg = "Thì tương lai hoàn thành của bạn đây!"; break;
                 case "13":/*So sánh bằng, hơn, nhất*/ link = "https://i.imgur.com/RVNSCUn.png"; msg = "Câu so sánh của bạn đây!"; break;
                 case "14":/*Câu bị động*/ link = "https://i.imgur.com/D0xjkQk.png"; msg = "Câu bị động của bạn đây!"; break;
                 case "15":/*Câu điều kiện*/ link = "https://i.imgur.com/6SgolY8.png"; msg = "Câu điều kiện của bạn đây!"; break;
                 case "16":/*Mệnh đề quan hệ*/ link = "https://i.imgur.com/ItfVgSi.png"; msg = "Mệnh đề quan hệ của bạn đây!"; break;
                 case "17":/*Câu trực tiếp và gián tiếp*/ link = "https://i.imgur.com/b8gprRm.gif"; msg = "Câu trực tiếp và gián tiếp của bạn đây!"; break;
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("Lựa chọn của bạn không phải là một con số!", event.threadID, event.messageID);
            if (choose > 17 || choose < 1) return api.sendMessage("Lựa chọn của bạn không nằm trong danh sách", event.threadID, event.messageID);
            if (link == "" || msg == "") {
                link = "https://influencermarketinghub.com/wp-content/uploads/2019/05/Later_Logo_Colour_03.png"
                msg = "này sẽ được cập nhật sau!";
            };
            return request(encodeURI(link)).pipe(createWriteStream(__dirname + `/cache/englíh.jpg`)).on("close", () =>api.sendMessage('Đang lấy dữ liệu...', event.threadID, event.messageID).then(api.sendMessage({body: `english ${msg}`, attachment: createReadStream(__dirname + "/cache/english.jpg")}, event.threadID, () => unlinkSync(__dirname + "/cache/toan.jpg"))));
            };
            module.exports.run = ({ event, api, args, client, utils }) => {
        switch(args[0]) {
                case "english": {
                return api.sendMessage(
                "=== ENGLISH ===" +
                "\n» Mời bạn nhập lựa chọn «" +
                "\n\n1. Thì hiện tại đơn." +
                "\n2. Thì hiện tại tiếp diễn." +
                "\n3. Thì hiện tại hoàn thành." +
                "\n4. Thì hiện tại hoàn thành tiếp diễn." +
                "\n5. Thì quá khứ đơn." +
                "\n6. Thì quá khứ tiếp diễn." +
                "\n7. Thì quá khứ hoàn thành." +
                "\n8. Thì quá khứ hoàn thành tiếp diễn." +
                "\n9. Thì tương lai đơn." +
                "\n10. Thì tương lai tiếp diễn." +
                "\n11. Thì tương lai gần." +
                "\n12. Thì tương lai hoàn thành." +
                "\n13. So sánh bằng, hơn, nhất." +
                "\n14. Câu bị động." +
                "\n15. Câu điều kiện." +
                "\n16. Mệnh đề quan hệ." +
                "\n17. Câu trực tiếp và gián tiếp." +
                "\n\n» Hãy reply tin nhắn và chọn theo số «"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "english"
                });
            }, event.messageID);
         }
            default:
            return utils.throwError("english", event.threadID, event.messageID); break;
        }
}