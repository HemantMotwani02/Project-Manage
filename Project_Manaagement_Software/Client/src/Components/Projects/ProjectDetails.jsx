import React from 'react';

function ProjectDetails(props) {
  

  return (

    <>
      {/* <h4>Project Details</h4> */}
      <div style={{ width:'80vw',borderRadius: '0.6em', backgroundColor: '#E0F1FD', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>


        {/*Project Details*/}
        <div>
          {/* <h4>Details</h4> */}
          <p>{props.description}</p>
        </div>


        {/*Team Members*/}
        <div >
          <h4>Team Members</h4>
          <ul>
            {/* {props.Members.map((i => <li> {i}</li>))} */}
            {/* {props.Members.map(member => <li>{member}</li>)} */}
          </ul>
        </div>

        {/*Time*/}
        <div style={{ color: 'grey', fontSize: '13px', alignSelf: 'flex-end', margin: '20px 0 -30px 0 ' }}>
          <p>{props.time}</p>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails



