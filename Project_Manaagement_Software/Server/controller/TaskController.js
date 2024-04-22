const db = require('../models/index');
const Tasks = db.tasks;

async function CreateTasks(req, res){
    const { id, role } = req.decoded; 
    const {  project_id, task_name, task_details, estimate_time } = req.body;
    const newTask = await Tasks.create({ project_id: project_id, task_name: task_name, task_details: task_details, estimate_time: estimate_time, status: "Open", created_by: id, updated_by: id, createdAt: new Date(), updatedAt: new Date() });

    if (newTask) { res.status(200).json({message:"Task Created",newTask}); }
    else { res.send("Error in creating task"); }
}


//join
async function GetTask(req, res) {
    const { project_id } = req.query;
    const tasks = await Tasks.findAll({ where: { project_id: project_id } });
    // console.log(tasks);
    res.status(200).json({ tasks });
}

module.exports={CreateTasks,GetTask};