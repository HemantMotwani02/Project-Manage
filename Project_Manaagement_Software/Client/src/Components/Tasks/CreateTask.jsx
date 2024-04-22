import Axios from 'axios';
import React, { useState } from 'react';
import './CreateTask.css';

function CreateTask(props) {
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [estimateTime, setEstimateTime] = useState('');


    async function handleCreateTask() {
        try {
            const token = localStorage.getItem('token');
            const taskCreateData = {
                task_name: taskName,
                task_details: taskDetails,
                estimate_time: estimateTime,
                user_id: props.user_id,
                project_id: props.project_id
            };

            const response = await Axios.post('http://127.0.0.1:8000/task/CreateTask',taskCreateData,{ headers: {Authorization: `Bearer ${token}`}});
            console.log(response.data);
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle error (e.g., display an error message to the user)
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'taskName':
                setTaskName(value);
                break;
            case 'taskDetails':
                setTaskDetails(value);
                break;
            case 'estimateTime':
                setEstimateTime(value);
                break;
            default:
                break;
        }
    }

    function handleResetTask() {
        setTaskName('');
        setTaskDetails('');
        setEstimateTime('');
    }

    return (
        <div className="login-page" style={{ position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)"}}>
            <div className="form" style={{ border: '1px solid grey' }}>
                <h3 style={{ margin: '0 0 30px 0' }}>Task Form</h3>
                <form className="login-form">
                    <input type="text" placeholder="Task Name" name='taskName' value={taskName} onChange={handleChange} />
                    <textarea placeholder='Task Details' name='taskDetails' value={taskDetails} onChange={handleChange} />
                    <input type="time" placeholder="Estimate Time" name='estimateTime' value={estimateTime} onChange={handleChange} />
                    <button type='button' onClick={handleCreateTask}>Create Task</button>
                    <button id='discard-btn' type='button' onClick={handleResetTask}>Reset</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;
