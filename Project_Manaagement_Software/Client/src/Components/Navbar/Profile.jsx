import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const navigate = useNavigate();

    function Role(id) {
        switch (id) {
            case 1: return 'Super Admin';
            case 2: return 'Manager';
            case 3: return 'Employee';
            default: return null;
        }
    }


    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/Login');
    }

    return (
        <>

            <div style={{ border: '1px solid red', width: '250px', height: '150px', padding: '10px', borderRadius: '0.8em', backgroundColor: "white", position: 'absolute', zIndex: '10', right: '120px',margin:"5px 0" }}>
                <p>{props.name}</p>
                <p>{props.email}</p>
                {/* <p>{props.role}</p> */}
                <button style={{ backgroundColor: '#f56161' }} onClick={handleLogout}>Log out</button>
            </div>
        </>
    )
}

export default Profile
