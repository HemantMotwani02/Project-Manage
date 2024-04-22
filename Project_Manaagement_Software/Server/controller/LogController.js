const db = require('../models/index');
const Logs = db.log;

async function AddLog(req, res) {
    const { task_id, start_time, end_time, description, user_id } = req.body;
    const newLog = await Logs.create({ task_id: task_id, start_time: start_time, end_time: end_time, description: description, status: "Pending", created_by: user_id, updated_by: user_id, createdAt: new Date(), updatedAt: new Date() });
    if (newLog) {
        res.status(200).send("New Log Created");
    }
    else { res.send("Error in creating log"); }
}

//join
async function ShowLogs(req, res) {
    const user_id = req.decode;
    const { id } = req.params;
    // if (role === 'Employee') {
    //     const logs = await Logs.findAll({ where: { task_id: id,created_by:user_id} });
    //     res.status(200).json({ logs });
    // }
    // else {
        const logs = await Logs.findAll({ where: { task_id: id } });
        res.status(200).json({ logs });
    // }
}

async function LogStatus(req, res) {
    const { log_id, task_id, status } = req.body;
    const newStatus = Logs.update({ status: status }, {
        where: { log_id: log_id, task_id: task_id }
    });

    if (newStatus) { res.status(200).json({ message: "Log Status updated", newStatus }); }
    else { res.send("Error in updating log status"); }
}

module.exports = { AddLog, ShowLogs, LogStatus };