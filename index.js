const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("./bot");
const { initDatabase } = require("./utils/db");
const createReminder = require("./commands/createReminder");
const deleteReminder = require("./commands/deleteReminder");
const listReminders = require("./commands/listReminders");

const {
  updateReminder,
  postponeReminder,
  groupReminders,
  periodicReminder,
  stats,
  exportReminders,
} = require("./commands");

const bot = new TelegramBot(TOKEN, { polling: true });

// Database'ni ishga tushirish
initDatabase();

console.log("🚀 Bot ishga tushdi!");

// Inline tugmachalar uchun callback lar
bot.on("callback_query", (query) => {
  const { data } = query;

  switch (data) {
    case "create_reminder":
      createReminder(bot, query);
      break;
    case "delete_reminder":
      deleteReminder(bot, query);
      break;
    case "update_reminder":
      updateReminder(bot, query);
      break;
    case "list_reminders":
      listReminders(bot, query);
      break;
    case "postpone_reminder":
      postponeReminder(bot, query);
      break;
    case "group_reminders":
      groupReminders(bot, query);
      break;
    case "periodic_reminder":
      periodicReminder(bot, query);
      break;
    case "stats":
      stats(bot, query);
      break;
    case "export_reminders":
      exportReminders(bot, query);
      break;
    default:
      bot.sendMessage(query.message.chat.id, "Noto'g'ri buyruq.");
  }
});

// Xabarlarni qayta ishlash
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/start") {
    bot.sendMessage(chatId, "Xush kelibsiz! Eslatmalar yaratish uchun tugmalardan foydalaning.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📝 Eslatma yaratish", callback_data: "create_reminder" }],
          [{ text: "🗑️ Eslatmani o'chirish", callback_data: "delete_reminder" }],
          [{ text: "✏️ Eslatmani yangilash", callback_data: "update_reminder" }],
          [{ text: "📋 Eslatmalar ro'yxati", callback_data: "list_reminders" }],
          [{ text: "⏰ Eslatmani kechiktirish", callback_data: "postpone_reminder" }],
          [{ text: "👥 Guruh eslatmalari", callback_data: "group_reminders" }],
          [{ text: "🔄 Davriy eslatmalar", callback_data: "periodic_reminder" }],
          [{ text: "📊 Statistika", callback_data: "stats" }],
          [{ text: "📤 Eksport", callback_data: "export_reminders" }],
        ],
      },
    });
  } else if (msg.text === "/help") {
    bot.sendMessage(chatId, "Mening buyruqlarim:\n/start - Botni ishga tushirish\n/help - Yordam olish");
  } else {
    bot.sendMessage(chatId, "Kechirasiz, bu buyruq mavjud emas.");
  }
});
