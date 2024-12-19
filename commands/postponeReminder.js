const { updateReminderByTime } = require("../utils/db");
const moment = require("moment");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  bot.sendMessage(chatId, "Kechiktirish uchun eslatma vaqtini HH:mm formatda kiriting.").then(() => {
    bot.once("message", (msg) => {
      const time = msg.text;

      if (!/^\d{2}:\d{2}$/.test(time)) {
        bot.sendMessage(chatId, "Noto'g'ri vaqt formati. Iltimos, HH:mm formatda kiriting.");
      } else {
        bot.sendMessage(chatId, "Eslatmani qancha daqiqa kechiktirishni kiriting.").then(() => {
          bot.once("message", (msg) => {
            const delay = parseInt(msg.text, 10);

            if (isNaN(delay) || delay <= 0) {
              bot.sendMessage(chatId, "Noto'g'ri daqiqa qiymati.");
            } else {
              const newTime = moment(time, "HH:mm").add(delay, "minutes").format("HH:mm");
              updateReminderByTime(chatId, time, newTime);
              bot.sendMessage(chatId, `Eslatma ${delay} daqiqaga kechiktirildi: ${newTime}.`);
            }
          });
        });
      }
    });
  });
};
