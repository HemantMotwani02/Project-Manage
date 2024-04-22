import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import Profile from './Profile';

function Header(props) {
    const [showProfile, setShowProfile] = useState(false);

    function menu() {
        setShowProfile(!showProfile);
    }

    return (
        <>
            <div style={{ width:'80vw',display: 'flex', border: '1px solid red', padding: '10px 25px',  justifyContent: "space-between", alignItems: 'center', borderRadius: '0.6em', }}>
                <div style={{ position: 'relative' }}>
                    <SearchIcon style={{ position: 'absolute', top: '5px', left: '10px' }} />
                    <input type="search" placeholder='Search Projects...' style={{ padding: '0 0 0 40px', border: '1px solid grey', borderRadius: '0.5em', height: '35px', backgroundColor: '#ECECEC', color: 'black' }} />

                </div>

                <div style={{ cursor: 'pointer' }} onClick={menu}>
                    <img src='../../../public/profile.png' alt='profile' style={{ height: '45px' }} className='profile' onClick={menu} />
                    <KeyboardArrowDownIcon />
                </div>
            </div>
            {showProfile ? <Profile name={props.name} email={props.email} role={props.role}/> : null}
        </>
    )
};

export default Header;


            // {showProfile && <Profile />}
