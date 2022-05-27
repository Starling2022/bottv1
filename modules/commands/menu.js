module.exports.config = {
	name: "menu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Binee",
	description: "Menu",
	usages: "[all/-a] [số trang]",
	commandCategory: "system",
	cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "vυι lòng cнọn ѕố";
	else if (num > data.length || num <= 0) msg = "ɴɢᴜ ᴠãɪ ʟồɴ ";
	else {
		const { commands } = global.client;
		let dataAfter = data[num-=1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += ` ╭──────╮\n   ${command_config.commandCategory.toUpperCase()}  \n╰──────╯   \n`;
			msg += `\n📘 Tên: ${dataAfter}`;
			msg += `\n💊 Mô tả: ${command_config.description}`;
			msg += `\n🌀 Cách dùng: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\n⏱ Thời gian chờ: ${command_config.cooldowns || 5}s`;
			msg += `\n🗝 Quyền hạn: ${(command_config.hasPermssion == 0) ? "Người dùng" : (command_config.hasPermssion == 1) ? "Quản trị viên nhóm" : "Quản trị viên bot"}`;
      msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
		} else {
			check = true;
			let count = 0;
			msg += `【    ${dataAfter.group.toUpperCase()}    】\n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n 【${count+=1}】 ${item}: ${commands.get(item).config.description}🐉`;
			})
			msg += "\n\n╭──────╮\n    Reply \n╰──────╯ tin nhắn theo số để xem thông tin chi tiết lệnh";
		}
	}
	const axios = require('axios');
	const fs = require('fs-extra');
	const img = ["https://i.imgur.com/5OWq207.jpg", "https://i.imgur.com/e9ufajV.jpeg",          "https://i.imgur.com/8HCm0cO.jpg",
               "https://i.imgur.com/q7JUZ2Q.jpg",
               "https://i.imgur.com/RUKKFsZ.jpg",
               "https://i.imgur.com/KIIWzuP.jpg",
               "https://i.imgur.com/AiQI8ji.jpg",
               "https://i.imgur.com/yxP96pa.jpg",
               "https://i.imgur.com/t3LRpAd.jpg",
              "https://i.imgur.com/HRx6vj2.jpg",
              "https://i.imgur.com/WoBjRsy.jpg",
"https://i.imgur.com/X7Eqe5i.jpg",
              "https://i.imgur.com/pK6Vnp7.jpg","https://i.imgur.com/xGTYbOn.jpg",
              "https://i.imgur.com/zWm8WwA.jpg",
              "https://i.imgur.com/UE8usdY.jpg","https://i.imgur.com/6M3ykr2.jpg", "https://i.imgur.com/5OWq207.jpg",
           "https://m.imgur.com/a/PGS9xbz",
               "https://i.imgur.com/NQwuIQH.jpg","https://i.imgur.com/IKJ3cDc.jpg","https://i.imgur.com/w9yHoPN.jpg","https://i.imgur.com/bZ02brL.jpg","https://i.imgur.com/LTGbUzr.jpg","https://i.imgur.com/N4NXynD.jpg","https://i.imgur.com/kHSYu11.jpg","https://i.imgur.com/jTQWSfz.jpg","https://i.imgur.com/1EiEX5q.jpg","https://i.imgur.com/v7eqUrU.jpg","https://i.imgur.com/SzpqS7I.jpg","https://i.imgur.com/ThofgjJ.jpg","https://i.imgur.com/9qxukta.jpg","https://i.imgur.com/BeBgPtz.jpg","https://i.imgur.com/MIYKVdA.jpg","https://i.imgur.com/DUCJVD3.jpg","https://i.imgur.com/XPQOYIm.jpg","https://i.imgur.com/CJTemdf.jpg","https://i.imgur.com/2ReT0PR.jpg","https://i.imgur.com/EYgdo8Z.jpg","https://i.imgur.com/tTeBxQC.jpg","https://i.imgur.com/kQck2vi.jpg","https://i.imgur.com/RRnY7rf.jpg","https://i.imgur.com/9LFOvYv.jpg","https://i.imgur.com/fWq4sNI.jpg","https://i.imgur.com/qoqhMsV.jpg","https://i.imgur.com/uwn5dce.jpg","https://i.imgur.com/juy86p3.jpg","https://i.imgur.com/kjVaz9G.jpg","https://i.imgur.com/bthxxlU.jpg","https://i.imgur.com/vGl2FXm.jpg","https://i.imgur.com/A8uwBAC.jpg","https://i.imgur.com/DMJUSbn.jpg","https://i.imgur.com/bTPIeWJ.jpg","https://i.imgur.com/pj98FIl.jpg" 
              ]
	var path = __dirname + "/cache/help.png"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 
	const imgP = []
	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
	imgP.push(fs.createReadStream(path))
	var msgg = {body: msg, attachment: imgP}
	api.unsendMessage(handleReply.messageID);
	return api.sendMessage(msgg, event.threadID, (error, info) => {
		if (error) console.log(error);
		if (check) {
			global.client.handleReply.push({
				type: "cmd_info",
				name: this.config.name,
				messageID: info.messageID,
				content: data[num].cmds
			})
		}
	}, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	const axios = require('axios');
	const fs = require('fs-extra');
	const imgP = []
	const img = ["https://i.imgur.com/5OWq207.jpg", "https://i.imgur.com/e9ufajV.jpeg",          "https://i.imgur.com/8HCm0cO.jpg",
               "https://i.imgur.com/q7JUZ2Q.jpg",
               "https://i.imgur.com/RUKKFsZ.jpg",
               "https://i.imgur.com/KIIWzuP.jpg",
               "https://i.imgur.com/AiQI8ji.jpg",
               "https://i.imgur.com/yxP96pa.jpg",
               "https://i.imgur.com/t3LRpAd.jpg",
              "https://i.imgur.com/HRx6vj2.jpg",
              "https://i.imgur.com/WoBjRsy.jpg",
"https://i.imgur.com/X7Eqe5i.jpg",
              "https://i.imgur.com/pK6Vnp7.jpg","https://i.imgur.com/xGTYbOn.jpg",
              "https://i.imgur.com/zWm8WwA.jpg",
              "https://i.imgur.com/UE8usdY.jpg","https://i.imgur.com/6M3ykr2.jpg", "https://i.imgur.com/5OWq207.jpg",
           "https://m.imgur.com/a/PGS9xbz",
                 "https://i.imgur.com/NQwuIQH.jpg","https://i.imgur.com/IKJ3cDc.jpg","https://i.imgur.com/w9yHoPN.jpg","https://i.imgur.com/bZ02brL.jpg","https://i.imgur.com/LTGbUzr.jpg","https://i.imgur.com/N4NXynD.jpg","https://i.imgur.com/kHSYu11.jpg","https://i.imgur.com/jTQWSfz.jpg","https://i.imgur.com/1EiEX5q.jpg","https://i.imgur.com/v7eqUrU.jpg","https://i.imgur.com/SzpqS7I.jpg","https://i.imgur.com/ThofgjJ.jpg","https://i.imgur.com/9qxukta.jpg","https://i.imgur.com/BeBgPtz.jpg","https://i.imgur.com/MIYKVdA.jpg","https://i.imgur.com/DUCJVD3.jpg","https://i.imgur.com/XPQOYIm.jpg","https://i.imgur.com/CJTemdf.jpg","https://i.imgur.com/2ReT0PR.jpg","https://i.imgur.com/EYgdo8Z.jpg","https://i.imgur.com/tTeBxQC.jpg","https://i.imgur.com/kQck2vi.jpg","https://i.imgur.com/RRnY7rf.jpg","https://i.imgur.com/9LFOvYv.jpg","https://i.imgur.com/fWq4sNI.jpg","https://i.imgur.com/qoqhMsV.jpg","https://i.imgur.com/uwn5dce.jpg","https://i.imgur.com/juy86p3.jpg","https://i.imgur.com/kjVaz9G.jpg","https://i.imgur.com/bthxxlU.jpg","https://i.imgur.com/vGl2FXm.jpg","https://i.imgur.com/A8uwBAC.jpg","https://i.imgur.com/DMJUSbn.jpg","https://i.imgur.com/bTPIeWJ.jpg","https://i.imgur.com/pj98FIl.jpg"  ]
	var path = __dirname + "/cache/help.png"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 

   	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
        imgP.push(fs.createReadStream(path))
	const command = commands.values();
	var group = [], msg = "╭──────╮\n         Menu \n╰──────╯\n     ◆━━━━━━━━━━◆";
	let check = true, page_num_input = "";
	let bonus = 0;

	for (const commandConfig of command) {
		if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
		else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
	}

	if (args[0] && ["all", "-a"].includes(args[0].trim())) {
		let all_commands = [];
		group.forEach(commandGroup => {
			commandGroup.cmds.forEach(item => all_commands.push(item));
		});
		let page_num_total = Math.ceil(all_commands.length / 10);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "vυι lòng cнọn ѕố";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "ɴɢᴜ ᴠãɪ ʟồɴ ";
			else check = true;
		}
		if (check) {
			index_start = (page_num_input) ? (page_num_input * 10) - 10 : 0;
			bonus = index_start;
			index_end = (index_start + 10 > all_commands.length) ? all_commands.length : index_start + 10;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
				msg += `\n${index_start+=1} ${e}: ${commands.get(e).config.description}`;
			})
			msg += `\n\n💦 𝘛𝘳𝘢𝘯𝘨【${page_num_input || 1}/${page_num_total}】`;
			msg += `\n🍄 Để xem các trang khác, dùng: ${prefix}menu [ all/-a ] [ số trang ]`;
			msg += "\n╭──────╮\n     Reply \n╰──────╯tin nhắn theo số để xem thông tin chi tiết lệnh";
		}
		var msgg = {body: msg, attachment: imgP}
		return api.sendMessage(msgg, threadID, (error, info) => {
			if (check) {
				global.client.handleReply.push({
					type: "cmd_info",
					bonus: bonus,
					name: this.config.name,
					messageID: info.messageID,
					content: all_commands
				})
			}
		}, messageID)
	}

	let page_num_total = Math.ceil(group.length / 10);
	if (args[0]) {
		check = false;
		page_num_input = parseInt(args[0]);
		if (isNaN(page_num_input)) msg = "vυι lòng cнọn ѕố";
		else if (page_num_input > page_num_total || page_num_input <= 0) msg = "ɴɢᴜ ᴠãɪ ʟồɴ ";
		else check = true;
	}
	if (check) {
		index_start = (page_num_input) ? (page_num_input * 10) - 10 : 0;
		bonus = index_start;
		index_end = (index_start + 10 > group.length) ? group.length : index_start + 10;
		group = group.slice(index_start, index_end);
		group.forEach(commandGroup => msg += `\n【${index_start+=1}】 ➣ ${commandGroup.group.toUpperCase()} `);
		msg += `\n\n🐉 𝘛𝘳𝘢𝘯𝘨【${page_num_input || 1}/${page_num_total}】`;
		msg += `\n🏛️ Để xem các trang khác, dùng: ${prefix}menu [ số trang ]`;
		msg += `\n╭──────╮\n       Reply \n╰──────╯ tin nhắn này và chọn số bên trên`;
		msg += `\nBot được điều hành bởi Jutsu`;
	}
	var msgg = {body: msg, attachment: imgP}
	return api.sendMessage(msgg, threadID, async (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			bonus: bonus,
			messageID: info.messageID,
			content: group
		})
	});
}