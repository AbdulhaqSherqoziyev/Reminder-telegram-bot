const { saveReminder } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  bot.sendMessage(chatId, "Davriy eslatma yaratish uchun vaqtni HH:mm formatda kiriting.").then(() => {
    bot.once("message", (msg) => {
      const time = msg.text;

      if (!/^\d{2}:\d{2}$/.test(time)) {
        bot.sendMessage(chatId, "Noto'g'ri vaqt formati. Iltimos, HH:mm formatda kiriting.");
      } else {
        bot.sendMessage(chatId, "Eslatmani har necha kunda takrorlashni kiriting (masalan, 7).").then(() => {
          bot.once("message", (msg) => {
            const interval = parseInt(msg.text, 10);

            if (isNaN(interval) || interval <= 0) {
              bot.sendMessage(chatId, "Noto'g'ri kunlar soni.");
            } else {
              saveReminder(chatId, time, `Davriy eslatma (har ${interval} kunda)`);
              bot.sendMessage(chatId, `Davriy eslatma ${time} vaqtida har ${interval} kunda qo'shildi.`);
            }
          });
        });
      }
    });
  });
};
