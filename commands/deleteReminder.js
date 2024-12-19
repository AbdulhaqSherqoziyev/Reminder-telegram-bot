const { deleteReminderByTime } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  bot.sendMessage(chatId, "O'chirish uchun eslatma vaqtini HH:mm formatda kiriting.").then(() => {
    bot.once("message", (msg) => {
      const time = msg.text;

      if (!/^\d{2}:\d{2}$/.test(time)) {
        bot.sendMessage(chatId, "Noto'g'ri vaqt formati. Iltimos, HH:mm formatda kiriting.");
      } else {
        deleteReminderByTime(chatId, time);
        bot.sendMessage(chatId, `Eslatma ${time} vaqtida o'chirildi.`);
      }
    });
  });
};
