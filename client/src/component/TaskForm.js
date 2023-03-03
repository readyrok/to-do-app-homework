import { useForm } from "react-hook-form";
import DataService from "../service/data.service";


const TaskForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitTask = (data) => {
        DataService.addTask(data.name, data.category, data.dateScheduledAt, data.estimatedHours);
        window.location.replace("/");
    }

    return (
        <div className="form-container">
            <div>
                Add Task
            </div>
            <form onSubmit={handleSubmit(submitTask)}>
                <div>	
                    <input id="name" type="text" placeholder="Name" {...register("name", { required: "Please submit task name" })}/>
                    {errors.name && <div className="error">{errors.name.message}</div>}
                </div>
                <div>
                    <select name="category" id="category" placeholder="Select" {...register("category", { required: "Please submit task category" })}>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="sport">Sport</option>
                        <option value="health">Health</option>
                        <option value="art">Art</option>
                    </select>
                    {errors.category && <div className="error">{errors.category.message}</div>}
                </div>
                <div>
                    <input id="date" type="text" placeholder="Scheduled Date" {...register("dateScheduledAt", { required: "Please submit finish date", pattern: {
                        value: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
                        message: "Date must be formatted like YYYY-MM-DD"
                    } })}/>
                    {errors.date && <div className="error">{errors.date.message}</div>}
                </div>
                <div>
                    <input id="hours" type="number" min="0" placeholder="Estimated Hours" {...register("estimatedHours", { required: "Please submit estimated hours", pattern: {
                        value: /^[1-9]\d*$/,
                        message: "Numbers bigger than 0 only"
                    }})}/>
                </div>
                <div>
                    <button className="task-btn" type='submit'>
                        Submit  
                    </button>
                </div>
            </form>
                                             
        </div>
    )
}

export default TaskForm;