module.exports.config = {
	name: "upt",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "system",
	cooldowns: 5,
	dependencies: {
		"pidusage": "",
		"fast-speedtest-api": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async ({ api, event,args, Users, getText }) => {
	const { threadID, messageID } = event;
    const { userName } = global.data;
	const axios = global.nodemodule["axios"];
	const fast = global.nodemodule["fast-speedtest-api"];
const { commands } = global.client;
const { events } = global.client;
	const speedTest = new fast({
			token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
			verbose: false,
			timeout: 10000,
			https: true,
			urlCount: 5,
			bufferSize: 8,
			unit: fast.UNITS.Mbps
		});
	const ketqua = await speedTest.getSpeed();
  const request = require('request');
	const fs = require("fs");
	const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const pidusage = await global.nodemodule["pidusage"](process.pid);

	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(`≻─── • © • ───≺\n\n❯ Time : ${gio}\n❯ Uptime : ${hours}:${minutes}:${seconds}\n❯ Prefix : ${global.config.PREFIX}\n❯ User : ${global.data.allUserID.length}\n❯ Box: ${global.data.allThreadID.length}\n❯ Cpu : ${pidusage.cpu.toFixed(1)}%\n❯ Ram : ${byte2mb(pidusage.memory)}\n❯ Ping : ${Date.now() - timeStart}ms\n❯ Speed : ${ketqua}\n≻─── • ©️ • ───≺`, event.threadID, event.messageID));
}
