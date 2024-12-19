const { getAllReminders } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  const reminders = getAllReminders(chatId);
  const total = reminders.length;

  if (total === 0) {
    bot.sendMessage(chatId, "Statistika mavjud emas. Eslatmalar yaratmagan bo'lishingiz mumkin.");
  } else {
    bot.sendMessage(chatId, `Sizda jami ${total} ta eslatma mavjud.`);
  }
};
