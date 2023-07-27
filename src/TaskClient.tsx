// interact with the server to get the tasks



import React, { useState, useEffect, useCallback } from 'react';
import Task from './task';
import { PortsGlobal } from './PortsGlobal';

// import the css file
import './TaskClient.css';


const port = PortsGlobal.serverPort;

const hostname = window.location.hostname;
const baseURL = `http://${hostname}:${port}`;


// a component that has a button to get the tasks from the server
// and display them in buttons that can be selected
// it has a label to display the selected task
// it has a button to add a count to the current task
// it has a button to release the task

// a function that will be called by the get tasks button
// it will get the tasks from the server and display them in buttons
// that can be selected

// define the props for the component, a string for the user name
interface TaskClientProps {
    userName: string;
    documentName: string;
}



export function TaskClient({ userName, documentName }: TaskClientProps) {
    // get the local host name to bypass CORS
    let localHostName = window.location.hostname;
    console.log(`localHostName: ${localHostName}`);
    console.log(`TaskClient rendering with documentName=${documentName}`);
    // rest of component code...

    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskName, setTaskName] = useState<string>('');
    const [docName, setDocName] = useState<string>(documentName);
    console.log(`TaskClient mounted with documentName=${documentName}`);




    const getTasks = useCallback(() => {
        const requestURL = baseURL + "/tasks"
        const jsonDocumentName = JSON.stringify({
            "documentName": documentName
        })
        console.log("get result------->" + jsonDocumentName)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }

        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {

                setTasks(json);
            }
            ).catch((error) => {
                console.log(`getTask error: ${error}`);
            }
            );
    }, [documentName]);

    // force a refresh 3 times a second.
    useEffect(() => {
        const interval = setInterval(() => {
            getTasks();
        }, 333);
        return () => {
            clearInterval(interval);
        };
    }, [documentName, getTasks]);



    function requestTask(taskId: string) {
        const path = `/tasks/assign/${taskId}/${userName}`
        const requestURL = baseURL + path;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`requestTask error: ${error}`);
            }
            );
    }

    function updateTask(taskId: string) {
        const path = `/tasks/update/${taskId}/${userName}/1`;
        const requestURL = baseURL + path;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`updateTask error: ${error}`);
            }
            );
    }

    function releaseTask(taskId: string) {
        const path = `/tasks/remove/${taskId}/${userName}`;
        const requestURL = baseURL + path;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`releaseTask error: ${error}`);
            }
            );
    }

    function completeTask(taskId: string) {
        const path = `/tasks/complete/${taskId}/${userName}`;
        const requestURL = baseURL + path;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`completeTask error: ${error}`);
            }
            );
    }

    function clearServer() {
        const path = `/tasks`;
        const requestURL = baseURL + path;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`clearServer error: ${error}`);
            }
            );
    }

    function deleteTask(taskId: string) {
        const path = `/tasks/delete/${taskId}/${userName}`;
        const requestURL = baseURL + path;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`deleteTask error: ${error}`);
            }
            );
    }

    function makeData() {
        const path = `/makedata`;
        const requestURL = baseURL + path;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`makeData error: ${error}`);
            }
            );
    }


    function addTask() {

        const path = `/tasks/add/${taskName}`;
        const requestURL = baseURL + path;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "documentName": documentName
            })
        }
        fetch(requestURL, options)
            .then((response) => {
                console.log(`response: ${response}`);
                return response.json();
            }
            ).then((json) => {
                console.log(`json: ${json}`);
                getTasks();
            }
            ).catch((error) => {
                console.log(`addTask error: ${error}`);
            }
            );
    }



    function getTaskString(task: Task) {
        return <div className="label">
            {task.id}-{task.name}[{task.time}]
        </div>

    }


    function getTaskComponent(task: Task) {
        console.log(task)
        let available = !task.complete && task.owner.length === 0;
        let working = false;
        if (task.owner === userName) {
            working = true;
        }
        if (task.complete) {
            return <div>
                <table><tr>
                    <td>{getTaskString(task)}</td>
                    <td>
                        <div className="label">
                            Completed by:{task.owner}
                        </div>
                    </td>
                </tr></table>

            </div>
        }
        if (available) {
            return <div>
                <table><tr>
                    <td>{getTaskString(task)} </td>
                    <td className="label"><button
                        onClick={() => requestTask(task.id)}>
                        Select
                    </button>
                    </td>
                </tr></table>
            </div>
        }
        if (working) {
            return <div >
                <table>
                    <tr>
                        <td>
                            {getTaskString(task)}
                        </td>
                        <td>
                            <button onClick={() => updateTask(task.id)}>
                                Update
                            </button>
                            <button onClick={() => releaseTask(task.id)}>
                                Release
                            </button>
                            <button onClick={() => completeTask(task.id)}>
                                Complete
                            </button>
                            <button onClick={() => deleteTask(task.id)}>
                                Delete
                            </button>

                        </td>
                    </tr>
                </table>
            </div>
        }

        return <div>
            <table>
                <tr>
                    <td>
                        {getTaskString(task)}
                    </td>
                    <td className="label">
                        {task.owner} is working

                    </td>
                </tr>
            </table>
        </div>
    }



    function getComponentForTasks(tasks: Task[]) {
        console.log(tasks)
        if (tasks.length > 0) {
            return <div>
                {tasks.map((task) => (
                    <li key={task.name}>{getTaskComponent(task)}
                    </li>

                ))}
            </div>
        } else {
            return <div>
                No tasks
            </div>
        }
    }


    function getControlButtons() {
        return <div>
            <table>
                <tr>
                    <td>
                        <button onClick={clearServer}>ClearServer</button>
                    </td>
                    <td>
                        <button onClick={makeData}>Make Data</button>
                    </td>
                    <td>
                        <button onClick={getTasks}>Get Tasks</button>
                    </td>

                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            placeholder="Task name"
                            onChange={(event) => {
                                // get the text from the input
                                let taskName = event.target.value;
                                // set the user name
                                setTaskName(taskName);
                            }}
                        />
                    </td>
                    <td>
                        <button onClick={addTask}>Add Task</button>
                    </td>
                </tr>
            </table>
        </div>
    }

    return (
        <div>
            <h3>control plane</h3>
            {getControlButtons()}
            <h3> data plane</h3>
            <ul>
                {getComponentForTasks(tasks)}
            </ul>
        </div>
    );
}
export default TaskClient;
// export function TaskClient() {
//     // get the local host name to bypass CORS
//     let localHostName = window.location.hostname;
//     console.log(`localHostName: ${localHostName}`);

//     const [tasks, setTasks] = useState<Task[]>([]);
//     useEffect(() => {
//         fetch(url)
//             .then((response) => {
//                 console.log(`response: ${response}`);
//                 return response.json();
//             }
//             ).then((json) => {
//                 console.log(`json: ${json}`);
//                 setTasks(json);
//             }
//             ).catch((error) => {
//                 console.log(`xxxxxxx error: ${error}`);
//             });
//     }, [url]);
//     return (
//         <div>
//             <h1>Tasks</h1>
//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task.name}>{task.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default TaskClient;