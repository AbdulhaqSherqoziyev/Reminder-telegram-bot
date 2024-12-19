const { updateReminderByTime } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  bot.sendMessage(chatId, "Yangilash uchun eski vaqtni HH:mm formatda kiriting.").then(() => {
    bot.once("message", (msg) => {
      const oldTime = msg.text;

      if (!/^\d{2}:\d{2}$/.test(oldTime)) {
        bot.sendMessage(chatId, "Noto'g'ri vaqt formati. Iltimos, HH:mm formatda kiriting.");
      } else {
        bot.sendMessage(chatId, "Yangi vaqtni kiriting.").then(() => {
          bot.once("message", (msg) => {
            const newTime = msg.text;

            if (!/^\d{2}:\d{2}$/.test(newTime)) {
              bot.sendMessage(chatId, "Noto'g'ri vaqt formati.");
            } else {
              updateReminderByTime(chatId, oldTime, newTime);
              bot.sendMessage(chatId, `Eslatma vaqti ${oldTime} dan ${newTime} ga o'zgartirildi!`);
            }
          });
        });
      }
    });
  });
};
