import { Fragment } from "react";
import { Link } from "react-router-dom";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";
import { useState } from "react";

const Home = () => {
    const [toggleForm, setToggleForm] = useState(false);

    const handleToggleForm = (e) => {
        setToggleForm(!toggleForm);
    }

    return (
        <Fragment>
            <div className="user-container">
                user@mail.com
            </div>            
            <div className="header-container">
                My ToDo List 
            </div>
            {!toggleForm && (
                <TaskList/>
            )}
            {toggleForm && (
                <TaskForm/>
            )}
            {!toggleForm && (
                <div className="footer-container">
                    <Link className="add-task-btn" onClick={handleToggleForm}>
                        +Add Task    
                    </Link>            
                </div>
            )}
            {toggleForm && (
                <div className="footer-container">
                    <Link className="add-task-btn" onClick={handleToggleForm}>
                        Back  
                    </Link>            
                </div>
            )}

        </Fragment>
    )
}

export default Home;