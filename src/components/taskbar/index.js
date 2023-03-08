import { useState } from 'react';
import axios from 'axios';

const Taskbar = () => {
  const [newTask, setNewTask] = useState('')

  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  const handleSubmit = async () => {
    let response = await axios({
      method: "POST",
      url: "/create_task",
      data: {newTask}
    })
  }

  return (
    <div className='taskbar'>
        <input 
        className='new-task' 
        type="text" 
        placeholder='Add New Task' 
        value={newTask} 
        onChange={handleChange}/>
        <button 
        className='task-submit'
        onClick={handleSubmit}>Add!</button>
    </div>
  )
}

export default Taskbar