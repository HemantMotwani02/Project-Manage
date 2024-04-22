import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import CreateTask from '../Tasks/CreateTask';

function ProjectTitle(props) {
    const [createTask, setCreateTask] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [editingDescription, setEditingDescription] = useState(false);
    const [description, setdescription] = useState(props.desc);

    function showTask() {
        setCreateTask(!createTask);
    }

    function toggleEditingTitle() {
        setEditingTitle(!editingTitle);
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleTitleBlur() {
        // Perform any necessary action when title editing is finished, like saving changes
        toggleEditingTitle();
    }


    function Description() {
        editingDescription ? (
            <input type="text" value={description} onChange={setdescription(event.target.value)} onBlur={handleTitleBlur} />) :
            (<>
                <p>{description}</p>
            </>)
    }

    return (
        <>
            <div style={{ width: '80vw', borderRadius: '0.8em', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '100px 10px 20px 10px ' }} >
                {/*Project Details*/}
                <div style={{ margin: '0 0 25px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '65vw' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {editingTitle ? (
                            <input type="text" value={title} onChange={handleTitleChange} onBlur={handleTitleBlur} />
                        ) : (
                            <>
                                <h2 id='ptitle' contentEditable={false}>{title}</h2>
                                <EditIcon style={{ margin: '0 0 3px 13px', fontSize: '22px', cursor: 'pointer' }} onClick={toggleEditingTitle} />
                            </>
                        )}
                    </div>

                    <div style={{ backgroundColor: '#82C5F4', width: '100px', height: '30px', borderRadius: '1em' }}><p style={{ color: 'white' }}>ongoing</p></div>
                    {/* #C2F9A8 */} {/*color:'green'*/}
                </div>

                <div>
                    <button onClick={showTask} style={{ margin: '0 5px 0 0' }}> <AddIcon />Create Task</button>

                    <button style={{ margin: '0 0 0 5px', backgroundColor: '#4caf50', display: editingTitle ? 'inline-block' : 'none' }} className='editbtn' onClick={handleTitleBlur}>Save Changes</button>
                    {/* <button style={{ margin: '0 10px' }}>Completed</button> */}
                </div>

                {createTask ? <CreateTask id={props.id} project_id={props.project_id} /> : null}


            </div>
        </>
    )
}

export default ProjectTitle;
