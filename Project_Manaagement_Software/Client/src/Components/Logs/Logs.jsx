import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import Log from './Log';
const Log = lazy(() => import('./Log'));

function Logs() {
    const { taskId } = useParams();
    const [logdata, setLogdata] = useState([]);
    const [logCount, setLogCount] = useState(0);
    const [updated, setUpdated] = useState(false);

    // console.log("Task Id: ",taskId);
    // View Logs
    function updatelogs() {
        console.log("Function Called");
        setUpdated(!updated);
    }

    useEffect(() => {

        async function showLogs(id) {
            const response = await Axios.get(`http://127.0.0.1:8000/log/ShowLogs/${id}`);;
            setLogdata(response.data.logs);
            setLogCount(response.data.logs.length);
        }
        showLogs(taskId);

    }, [updated]);

    return (
        <>
            <Link to='/'>Back to Dashboard</Link>
            <h2>Total Logs ({logCount})</h2>

            <MDBTable align='middle'>

                <MDBTableHead dark>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Task Name</th>
                        <th scope='col'>Task Description</th>
                        <th scope='col'>Log Description</th>
                        <th scope='col'>Created By</th>
                        <th scope="col">Log Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>

                    <Suspense fallback='{Logs are Loading...}'>
                        {logdata.map(log => <Log id={log.log_id} desc={log.description} by={log.created_by} date={log.createdAt} status={log.status} taskId={log.task_id} parentfunction={updatelogs} />)}
                        {/* taskName={log.tname} taskDesc={log.tdesc} */}
                    </Suspense>

                    {/* <Log /> */}
                </MDBTableBody>

            </MDBTable>

        </>
    )
}

export default Logs;



//danger
//warning



















