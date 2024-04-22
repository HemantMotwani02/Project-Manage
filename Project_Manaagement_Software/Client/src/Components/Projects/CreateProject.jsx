import Axios from 'axios';
import React, { useState } from 'react';

function CreateProject(props) {
    let [ProjectName, setProjectName] = useState();
    let [ProjectDetails, setprojectDetails] = useState();
    let [managerId, setManagerId] = useState();

    async function HandleCreateProject() {

        const ProjectData = {
            project_name: ProjectName,
            details: ProjectDetails,
            manager_id: managerId,
            // end_time: endTime,
            // user_id: 23
        }

        const response = await Axios.post('http://127.0.0.1:8000/project/Createproject', ProjectData,{ headers: {Authorization: `Bearer ${token}`}});
        console.log(response.data);
    }


    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'Details':
                setprojectDetails(value);
                break;
            // case 'startTime':
            //     setManagerId(value);
            //     break;
            case 'Name':
                setProjectName(value);
                break;
            default:
                break;
        }
    }

    function HandleResetTask() {
        setprojectDetails('');
        setManagerId('');
        setProjectName('');
    }


    return (
        <>
            <div className="login-page" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>

                <div className="form" style={{ border: '1px solid grey' }}>
                    <h3 style={{ margin: '0 0 30px 0' }}>Project</h3>
                    <form className="login-form">
                        <input type="text" placeholder="Project Name" name='Name' value={ProjectName} onChange={handleChange} />
                        <textarea placeholder='Project Details' name='Details' value={ProjectDetails} onChange={handleChange} />
                        {/* <input type="time" placeholder="Start Time" name='startTime' value={startTime} onChange={handleChange} /> */}

                        {/* <input type="password" placeholder="password" /> */}
                        <button type='submit' onClick={HandleCreateProject}>Create</button>
                        <button id='discard-btn' type='reset' onClick={HandleResetTask} >Cancel</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProject;
