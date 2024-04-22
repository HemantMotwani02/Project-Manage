import React, { useState } from 'react';
import AvailProjects from './AvailProjects';
import './Sidebar.css';
import CreateProject from '../Projects/CreateProject'; // Import CreateProject component

function Sidebar({ projects, onProjectSelect }) {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const handleCreateProjectClick = () => {
    setIsCreateProjectOpen(true);
  };

  const handleCreateProjectClose = () => {
    setIsCreateProjectOpen(false);
  };

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
            <div style={{width:'100%',textAlign:'left',}} onClick={() => handleProjectClick(project.pid)} key={project.pid}>
              <AvailProjects pid={project.project_id} pname={project.project_name} />
            </div>
          ))}

          <div id="nav-content-highlight">
            <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleCreateProjectClick}>Create Project</button>
            <button style={{ backgroundColor: '#f56161', color: 'white', margin:'5px' }} onClick={handleCreateProjectClick}>Delete Account</button>
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
