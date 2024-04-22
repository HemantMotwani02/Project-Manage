import { MDBBadge } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';




function Log(props) {
    const [color, setColor] = useState('');
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        switch (props.status) {
            case 'Decline':
                setColor('danger'); break;
            case 'Approved':
                setColor('success'); break;
            default:
                setColor(''); // Default to warning for any other status
                break;

        };
    }, [])


    function ChangeLogStatus(event) {
        const status = event.target.name === 'Accept' ? 'Approved' : 'Decline';
        Axios.put('http://127.0.0.1:8000/log/LogStatus', {
            log_id: props.id,
            task_id: props.taskId, // Assuming task_id is not needed for this request
            status: status
        })
            .then(response => {
                if(response.message ==='Log Status updated')
                {
                    setUpdated(true);
                    // setColor(status === 'Approved' ? 'success' : 'danger');
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error updating log status:', error);
            });

    }
    // if (!updated) {
    //     return null;
    // }

    return (
        <>
            <tr>
                <th scope="row">{props.id}</th>
                <td></td>
                <td></td>
                <td>{props.desc}</td>
                <td>{props.by}</td>
                <td>{props.date}</td>
                <td>

                    <MDBBadge color={color} pill>

                        {props.status === 'Pending' ? (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                    <button style={{ margin: '5px', background: 'orange', color: 'black' }} name='Accept' onClick={ChangeLogStatus}>Accept</button>
                                    <button style={{ margin: '5px', background: 'orange', color: 'black' }} name='Reject' onClick={ChangeLogStatus}>Reject</button>
                                </div>
                            </>
                        ) : (
                            props.status
                        )}

                    </MDBBadge></td>

            </tr>
        </>
    )
}

export default Log;






