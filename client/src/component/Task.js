import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import PaletteIcon from '@mui/icons-material/Palette';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import DataService from '../service/data.service';

const Task = (task) => {
    let dateScheduledAt = "";
    let today = new Date().toJSON().slice(0,10)

    const category = task.task[1].category;
    const [daysUntilExpiration, setDaysUntilExpiration] = useState(0);
    const [toggleFinish, setToggleFinish] = useState(false);
    const [actualHours, setActualHours] = useState(false);

    const makeDate = (item) => {
        if(item.toString().length>1){
            dateScheduledAt += item + "-";
        }else{
            dateScheduledAt += "0" + item + "-";
        }
        
    }

    const handleDeleteTask = () => {
        DataService.deleteTask(task.task[1].id);
    }

    const handleFinishTask = () => {
        setToggleFinish(true);
    }

    const submitFinishTask = () => {
        DataService.finishTask(task.task[1].id, actualHours);
    }

    task.task[1].dateScheduledAt.forEach(makeDate);

    dateScheduledAt = dateScheduledAt.substring(0, dateScheduledAt.length - 1);

    let yearToday = today.substring(0,3);
    let monthToday = today.substring(5,7);
    let dayToday = today.substring(8,10);
    let yearScheduled = dateScheduledAt.substring(0,3);
    let monthScheduled = dateScheduledAt.substring(5,7);
    let dayScheduled = dateScheduledAt.substring(8,10);

    const getDaysUntilExpiration = () => {
        let daysUntilExpiration = 0;
        let years = parseInt(yearScheduled) - parseInt(yearToday)
        let months = parseInt(monthScheduled) - parseInt(monthToday)
        let days = parseInt(dayScheduled) - parseInt(dayToday)
        daysUntilExpiration += years*365 + months*30 + days;
        setDaysUntilExpiration(daysUntilExpiration);
    }
    
    useEffect(() => {
        getDaysUntilExpiration();
    })
    

    return (
        <div className="task-container">
            <div className="icon-container">
                {category.toLowerCase()==="home" && (
                    <HomeIcon fontSize='large'/>
                )}
                {category.toLowerCase()==="sport" && (
                    <FitnessCenterIcon fontSize='large'/>
                )}
                {category.toLowerCase()==="art" && (
                    <PaletteIcon fontSize='large'/>
                )}
                {category.toLowerCase()==="work" && (
                    <WorkIcon fontSize='large'/>
                )}
                {category.toLowerCase()==="health" && (
                    <HealthAndSafetyIcon fontSize='large'/>
                )}
                {category.toLowerCase()==="outdoor" && (
                    <NaturePeopleIcon fontSize='large'/>
                )}
            </div>

            {toggleFinish && (
                <form onSubmit={submitFinishTask}>
                    <div>
                        <input id="hours" type="number" min="0" placeholder="Actual Hours" onChange={(e) => setActualHours(e.target.value)}/>
                    </div>
                    <div>
                        <button className="task-btn" type='submit'>
                            Submit  
                        </button>
                    </div>
                </form>
            )}
            
            {!toggleFinish && (
                <div className="name-container">
                    {task.task[1].name}
                </div>
            )}            

            {daysUntilExpiration>1 && task.task[1].dateFinishedAt===null && (
                <div className="date-container">{dateScheduledAt}<br/>{daysUntilExpiration} day(s) left</div>
                
            )}

            {daysUntilExpiration<=1 && task.task[1].dateFinishedAt===null && (
                <div className="date-container-expired">{dateScheduledAt}<br/>{daysUntilExpiration} day(s) left</div>
            )}

            {task.task[1].dateFinishedAt===null && (
                <Fragment>
                    <div className="finished-btn-container">
                        <Link className="task-btn" onClick={handleFinishTask}>
                            Done  
                        </Link>   
                    </div>
                    <div className="delete-btn-container">
                        <Link className="task-btn" onClick={handleDeleteTask}>
                            Delete  
                        </Link>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default Task;