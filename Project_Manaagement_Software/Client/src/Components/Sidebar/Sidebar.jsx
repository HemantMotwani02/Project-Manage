import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProject from '../Projects/CreateProject'; // Import CreateProject component
import AvailProjects from './AvailProjects';
import './Sidebar.css';

function Sidebar({ projects, onProjectSelect }) {
  const navigate = useNavigate();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const handleCreateProjectClick = () => {
    setIsCreateProjectOpen(true);
  };

  const handleCreateProjectClose = () => {
    setIsCreateProjectOpen(false);
  };


  function handleDelete() {
    const token = localStorage.getItem('token');
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const response = Axios.delete('http:127.0.0.1:8000//DeleteUser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.message);
      if (response.message == "Account Deleted") {
        navigate('/Login');
      }
      else {
        alert("error");
      }
    } else {
      console.log('Cancel');
    }
  }


  return (
    <>
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header">
          <a id="nav-title" href="#">Projects</a>
          <label htmlFor="nav-toggle">
            <span id="nav-toggle-burger"></span>
          </label>
          <hr />
        </div>

        {/* Project Menu */}
        <div id="nav-content">
          {projects.map(project => (
            <div style={{ width: '100%', textAlign: 'left', }} onClick={() => onProjectSelect(project.project_id)}>
              <AvailProjects pid={project.project_id} pname={project.project_name} />
            </div>
          ))}
          {/* <p>{userData}</p> */}
          <div id="nav-content-highlight">
            <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleCreateProjectClick}>Create Project</button>
            <button style={{ backgroundColor: '#f56161', color: 'white', margin: '5px' }} onClick={handleDelete}>Delete Account</button>
          </div>
        </div>
      </div>

      {isCreateProjectOpen && (
        <CreateProject onClose={handleCreateProjectClose} />
      )}
    </>
  );
}

export default Sidebar;
