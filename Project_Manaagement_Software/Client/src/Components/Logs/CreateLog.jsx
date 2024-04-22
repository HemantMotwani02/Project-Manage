import Axios from 'axios';
import React, { useState } from 'react';

function CreateLog(props) {
    let [Description, setDescription] = useState();
    let [startTime, setStartTime] = useState();
    let [endTime, setEndTime] = useState();

    async function HandleCreateTask() {

        const LogData = {
            task_id: props.task_id,
            description: Description,
            start_time: startTime,
            end_time: endTime,
            user_id: 23
        }

        const response = await Axios.post('http://127.0.0.1:8000/log/AddLog', LogData,{ headers: {Authorization: `Bearer ${token}`}});
        console.log(response.data);
    }


    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'Description':
                setDescription(value);
                break;
            case 'startTime':
                setStartTime(value);
                break;
            case 'endTime':
                setEndTime(value);
                break;
            default:
                break;
        }
    }

    function HandleResetTask() {
        setDescription('');
        setStartTime('');
        setEndTime('');
    }


    return (
        <>
            <div className="login-page"  style={{ position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)"}}>

                <div className="form" style={{ border: '1px solid grey' }}>
                    <h3 style={{ margin: '0 0 30px 0' }}>Log</h3>
                    <form className="login-form">
                        <textarea placeholder='Description' name='Description' value={Description} onChange={handleChange} />
                        <input type="time" placeholder="Start Time" name='startTime' value={startTime} onChange={handleChange} />
                        <input type="time" placeholder="End Time" name='endTime' value={endTime} onChange={handleChange} />
                        {/* <input type="password" placeholder="password" /> */}
                        <button type='submit' onClick={HandleCreateTask}>Log</button>
                        <button id='discard-btn' type='reset' onClick={HandleResetTask}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateLog;
