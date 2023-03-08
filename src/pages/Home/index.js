import React, { useEffect, useState} from 'react';
import Taskbar from '../../components/taskbar';
import './index.css';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    const [tasks, setTasks] = useState([]);
    console.log(tasks);
    useEffect(() => {
        const getData = async () => {
          let response = await axios('/get_tasks')
          console.log(response);
        //   getting tasks data here
        let toDoTasks = [...response.data];
        setTasks(toDoTasks);
        }
        getData()
      }, [])
    
      const tasksJSX = tasks.map((task) => {
        return (
            <Card className='m-3' style={{ border: 'none'}}>
                <Card.Body>
                    <li
                    key={task._id}
                    className={task.completed ? "task strike" : "task"}
                    >
                    {task.task} <br />
                    <Button
                    className='mark-complete, m-1'
                    onClick={() => handleComplete(task._id)}
                    >
                    completed!
                    </Button>
                    <Button
                    className='delete'
                    onClick={() => handleDelete(task._id)}
                    >
                    delete
                    </Button>
                    </li>
                </Card.Body>
            </Card>
        )
      })

      const handleComplete = async (taskId) => {
        let response = await axios({
            method: "PUT",
            url: `/update_task/${taskId}`,
        })
        let tasksCopy = [...tasks]
        tasksCopy.forEach((task) => {
            if (task._id == taskId) {
                task.completed = true
            }
        })
        setTasks(tasksCopy)
        }

      const handleDelete = async (taskId) => {
        let response = await axios({
            method: "DELETE",
            url: `/delete/${taskId}`,
        })
        }



  return (
    <div>
        <h1>To-Do List</h1>
        <Taskbar />
        <div>
            {/* put tasks JSX here */}
            {tasksJSX}
        </div>
    </div>
  )
}

export default Home