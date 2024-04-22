import React from 'react'

function AvailProjects(props) {
    return (
        <>
            <div class="nav-button" id={props.pid}><i class="fas fa-palette"></i><span>{props.pname}</span></div>
        </>
    )
}

export default AvailProjects
