import Axios from 'axios';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Placeholder from '../Placeholder';
import Sidebar from '../Sidebar/Sidebar';
import './Project.css';
import ProjectDetails from './ProjectDetails';
import ProjectTitle from './ProjectTitle';

const Task = lazy(() => import('../Tasks/Task'));

function Project(props) {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleProjectSelect = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const location = useLocation();
    const userData = location.state.userData;

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            try {
                const response = await Axios.get('http://127.0.0.1:8000/project/projects', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjects(response.data.data);
                setMembers(response.data.data.teams)
                //console.log(response.data.data); .teams array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        }
        fetchData();
    }, []);


    async function showTasks() {
        const token = localStorage.getItem('token');
        const projectId = projects[0].project_id;
        try {
            const response = await Axios.get(`http://127.0.0.1:8000/task/tasks?project_id=${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setTasks(response.data.tasks);
            //console.log(response.data.tasks); user object
        } catch (error) {
            console.error('Error fetching task data:', error);
        }
    }

    return (
        <div id='projectpage'>

            <div className="main-content">
                <Navbar name={userData.name} email={userData.email} role={userData.role} />
                {projects.length > 0 ? (
                    <>
                        <ProjectTitle project_id={projects[0].project_id} user_id={projects[0].created_by} title={projects[0].project_name} />
                        <ProjectDetails
                            description={projects[0].project_details}
                            time={projects[0].createdAt}
                            by={projects[0].created_by}
                        />
                        <button onClick={showTasks} style={{ marginTop: "15px" }}>Show Tasks</button>
                        <div style={{ overflow: 'auto', width: "80vw", height: "40vh" }}>
                            {tasks.map(task => (
                                <Suspense fallback={<Placeholder />} key={task.task_id}>
                                    <Task
                                        task_id={task.task_id}
                                        title={task.task_name}
                                        description={task.task_details}
                                        Time={task.createdAt}
                                        CreatedBy={task.user.name}
                                        projectId={task.project_id}
                                    />

                                </Suspense>
                            ))}
                        </div>
                    </>
                ) : (
                    <Placeholder />
                )}
                <Footer className="footer" />
            </div>
            <Sidebar projects={projects} className="sidebar" onProjectSelect={handleProjectSelect} />
        </div>
    );
}

export default Project;
