const { getAllReminders } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;
  const reminders = getAllReminders(chatId);

  if (reminders.length === 0) {
    bot.sendMessage(chatId, "Eslatmalar mavjud emas.");
  } else {
    let message = "Sizning eslatmalaringiz:\n";
    reminders.forEach((reminder, index) => {
      message += `${index + 1}. ${reminder.time} - ${reminder.text}\n`;
    });
    bot.sendMessage(chatId, message);
  }
};
