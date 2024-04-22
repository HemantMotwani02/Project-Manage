import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CreateLog from '../Logs/CreateLog';

function Task(props) {
    const [showCreateLog, setShowCreateLog] = useState(false);
    const createLogRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (createLogRef.current && !createLogRef.current.contains(event.target)) {
                setShowCreateLog(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAddLogClick = () => {
        setShowCreateLog(true);
    };

    const handleCloseCreateLog = () => {
        setShowCreateLog(false);
    };

    return (
        <>
            <div style={{ borderRadius: '0.6em', width: '80vw', backgroundColor: '#E0F1FD', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px ', margin: '15px 0' }}>
                <div>
                    <p style={{ fontWeight: 'bold' }}>Task Name:- {props.title}</p>
                </div>
                <div>
                    <p style={{ wordBreak: 'break-all' }}>Task Details:- {props.description} </p>
                </div>
                {/* View Logs */}
                <div>
                    <Link to={`/logs/${props.task_id}`}>
                        <button style={{ width: '100px', fontSize: '12px' }}>View Logs</button>
                    </Link>
                    <button style={{ width: '100px', fontSize: '12px', marginLeft: '10px' }} onClick={handleAddLogClick}>Add Log</button>
                </div>
                {/* Time */}
                <div style={{ color: 'grey', fontSize: '13px', alignSelf: 'flex-end', margin: '20px -15px -20px 0' }}>
                    <span style={{ margin: '0 15px' }}>{props.CreatedBy}</span>
                    <span>{props.Time.split('T')[0]}</span>
                </div>
            </div>
            {showCreateLog && <div ref={createLogRef}><CreateLog onClose={handleCloseCreateLog} task_id={props.task_id} user_id={3}/></div>}
        </>
    )
}

export default Task;
