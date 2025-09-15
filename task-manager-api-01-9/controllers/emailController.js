// controllers/emailController.js
const transporter = require("../utils/mailer");
const taskSummaryTemplate = require("../utils/emailTemplate");
const Task = require("../models/Task");
const User = require("../models/Auth");

const sendTaskSummary = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware (JWT etc.)
    const user = await User.findById(userId);
    const tasks = await Task.find({ userId });

    const html = taskSummaryTemplate({
      userName: user.name,
      tasks,
    });

    await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Task Summary Report",
      html,
    });

    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendTaskSummary };
