// utils/emailTemplate.js
function taskSummaryTemplate({ userName, tasks }) {
  // tasks = array of objects: { title, status, createdAt }

  const rows = tasks
    .map(
      (task, i) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${i + 1}</td>
        <td style="padding:8px;border:1px solid #ddd;">${task.title}</td>
        <td style="padding:8px;border:1px solid #ddd;">${task.status}</td>
        <td style="padding:8px;border:1px solid #ddd;">${new Date(
          task.createdAt
        ).toLocaleString()}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
    <h2 style="color:#333;">Hello ${userName},</h2>
    <p>Here is your task summary:</p>
    
    <table style="border-collapse:collapse;width:100%;background:#fff;">
      <thead>
        <tr style="background:#007bff;color:#fff;">
          <th style="padding:8px;border:1px solid #ddd;">#</th>
          <th style="padding:8px;border:1px solid #ddd;">Title</th>
          <th style="padding:8px;border:1px solid #ddd;">Status</th>
          <th style="padding:8px;border:1px solid #ddd;">Created At</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    
    <p style="margin-top:20px;">✔ Total Tasks: <b>${tasks.length}</b></p>
    <p>✔ Completed: <b>${
      tasks.filter((t) => t.status === "done").length
    }</b></p>
    <p>✔ Pending: <b>${
      tasks.filter((t) => t.status !== "done").length
    }</b></p>
    
    <p style="margin-top:20px;">Thanks for using our Task Manager App 🚀</p>
  </div>`;
}

module.exports = taskSummaryTemplate;
