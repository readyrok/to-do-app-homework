import Task from './Task'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../service/data.service';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [order, setOrder] = useState("Asc");

    useEffect(() => {
        DataService.getTasks().then(
            (response) => {
                setTasks(Object.entries(response.data));
            },
            (error) => {
                const responseError = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                
                setError(responseError);
            }
        )
    }, []);

    const handleOrderAsc = () => {
        setOrder("Desc");
        DataService.getTasksAsc().then(
            (response) => {
                console.log(response.data);
                setTasks(Object.entries(response.data));
            },
            (error) => {
                const responseError = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                
                setError(responseError);
            }
        )
    }

    const handleOrderDesc = () => {
        setOrder("Asc");
        DataService.getTasksDesc().then(
            (response) => {
                setTasks(Object.entries(response.data));
            },
            (error) => {
                const responseError = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                
                setError(responseError);
            }
        )
    }

    return (
        <div className="content-container">
            <div className="sorting-container">
                <div className="sort-btn-container">
                    {order==="Asc" && (
                        <Link className="sort-btn" onClick={handleOrderAsc}>
                            Asc  
                        </Link>
                    )}
                    {order==="Desc" && (
                        <Link className="sort-btn" onClick={handleOrderDesc}>
                            Desc  
                        </Link>
                    )}
                        
                </div>
            </div>
            {tasks.map((task) => {
                return (<Task key={task[0]} task={task}/>);
            })}            
        </div>
    )
}

export default TaskList;