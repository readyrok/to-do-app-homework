import axios from "axios";

const API_URL = "http://localhost:8080/tasks"

const getTasks = () => {
    return axios.get(API_URL);
}

const getTasksAsc = () => {
    return axios.get(API_URL+"/asc");
}

const getTasksDesc = () => {
    return axios.get(API_URL+"/desc");
}

const deleteTask = (id) => {
    return axios.delete(API_URL + "/" + id + "/")
}

const finishTask = (id, actualHours) => {
    return axios.patch(API_URL+"?id=" + id + "&actualHours=" + actualHours);
}

const addTask = (name, category, dateScheduledAt, estimatedHours) => {
    return axios.post(API_URL+"?category=" + category + "&name=" + name + "&dateScheduledAt=" + dateScheduledAt + "&estimatedHours=" + estimatedHours);
}

const DataService = {
    getTasks,
    getTasksAsc,
    getTasksDesc,
    deleteTask,
    finishTask,
    addTask
}

export default DataService;