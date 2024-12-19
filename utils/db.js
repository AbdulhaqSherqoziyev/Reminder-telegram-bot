let reminders = [];

module.exports = {
  initDatabase: () => {
    reminders = [];
    console.log("Database initialized.");
  },

  saveReminder: (chatId, time, text) => {
    reminders.push({ chatId, time, text });
  },

  deleteReminderByTime: (chatId, time) => {
    reminders = reminders.filter((r) => r.chatId !== chatId || r.time !== time);
  },

  updateReminderByTime: (chatId, oldTime, newTime) => {
    const reminder = reminders.find((r) => r.chatId === chatId && r.time === oldTime);
    if (reminder) reminder.time = newTime;
  },

  getAllReminders: (chatId) => {
    return reminders.filter((r) => r.chatId === chatId);
  },
};
