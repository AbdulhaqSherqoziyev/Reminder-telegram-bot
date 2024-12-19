const { saveReminder } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  bot.sendMessage(chatId, "Eslatma yaratish uchun vaqtni HH:mm formatda kiriting.").then(() => {
    bot.once("message", (msg) => {
      const time = msg.text;

      if (!/^\d{2}:\d{2}$/.test(time)) {
        bot.sendMessage(chatId, "Noto'g'ri vaqt formati. Iltimos, HH:mm formatda kiriting.");
      } else {
        saveReminder(chatId, time, "Eslatma matni (keyinchalik o'zgartirishingiz mumkin).");
        bot.sendMessage(chatId, `Eslatma ${time} vaqtiga qo'shildi!`);
      }
    });
  });
};
