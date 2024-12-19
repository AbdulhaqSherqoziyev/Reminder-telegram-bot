const fs = require("fs");
const { getAllReminders } = require("../utils/db");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  const reminders = getAllReminders(chatId);
  if (reminders.length === 0) {
    bot.sendMessage(chatId, "Eksport qilish uchun eslatmalar mavjud emas.");
  } else {
    const filePath = `reminders_${chatId}.txt`;
    const data = reminders.map((r) => `${r.time} - ${r.text}`).join("\n");

    fs.writeFileSync(filePath, data);

    bot.sendDocument(chatId, filePath).then(() => {
      fs.unlinkSync(filePath);
    });
  }
};
