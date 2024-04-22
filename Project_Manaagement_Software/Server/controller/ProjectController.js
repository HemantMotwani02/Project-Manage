const db = require('../models/index');
const Projects = db.projects;
const Teams = db.teams;
const jwt = require('jsonwebtoken');

//join
async function ShowProjects(req, res) {
    try {
        const { id, role } = req.decoded; // Extract user ID and role from decoded token

        // Projects for Super Admin
        if (role === "Super Admin") {
            const data = await Projects.findAll({
                where: { created_by: id }
            });

            return res.status(200).json({ data });
        }
        // Projects for Manager
        else if (role === "Manager") {
            const data = await Projects.findAll({
                attributes: ['project_id', 'project_name', 'project_details', 'created_by', 'createdAt'],
                where: { manager_id: id }
            });

            return res.status(200).json({ data });
        }
        // Projects for Employee
        else if (role === "Employee") {
            const data = await Teams.findAll({
                attributes: ['project_id'],
                where: { user_id: id }
            });

            const userProjects = await Teams.findOne({
                where: { project_id: data[0].project_id }
            });
            return res.status(200).json({ userProjects });
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


async function CreateProject(req, res){
    const { id, manager_id, project_name, project_details, role } = req.body;
    const newProject = await Projects.create({ manager_id: manager_id, project_name: project_name, project_details: project_details, created_by: id, updated_by: id, createdAt: new Date(), updatedAt: new Date() });

    if (newProject) {
        res.status(200).json({ newProject });
    }
    else { res.send("Error in creating project"); }

}
async function UpdateProject(req, res) {
    const { project_id, project_name, project_details, user_id } = req.body;
    let response = await Projects.update({ project_name: project_name, project_details: project_details, updated_by: user_id, updatedAt: new Date() }, {
        where: {
            project_id: project_id
        }
    });
    if (response) {
        res.status(200).json({ response });
    }
    else { res.send("Error in updating the project"); }
}

module.exports = {ShowProjects,CreateProject,UpdateProject};