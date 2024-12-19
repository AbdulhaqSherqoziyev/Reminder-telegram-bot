const db = require("../utils/db");
const helper = require("../utils/helper");

module.exports = (bot, query) => {
  const chatId = query.message.chat.id;

  // Guruh uchun eslatma yaratish
  bot.sendMessage(chatId, "👥 Guruh uchun eslatma yaratmoqchimisiz? Matnni yuboring:");

  bot.once("message", (msg) => {
    const text = msg.text;

    if (!text) {
      bot.sendMessage(chatId, "🚫 Eslatma matni bo'sh bo'lishi mumkin emas.");
      return;
    }

    bot.sendMessage(chatId, "🕒 Vaqtni kiriting (HH:MM):");

    bot.once("message", (timeMsg) => {
      const time = timeMsg.text;

      if (!helper.isValidTime(time)) {
        bot.sendMessage(chatId, "❌ Noto'g'ri vaqt formati. To'g'ri format: HH:MM");
        return;
      }

      const formattedTime = helper.formatTime(time);
      db.addReminder(chatId, { text, time: formattedTime });

      bot.sendMessage(
        chatId,
        `✅ Guruh uchun eslatma yaratildi:\n📝 ${text}\n🕒 ${formattedTime}`
      );
    });
  });
};
