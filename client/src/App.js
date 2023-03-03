import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';
import TaskForm from './component/TaskForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add-task" element={<TaskForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
