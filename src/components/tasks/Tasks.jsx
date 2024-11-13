import React, { useEffect, useState } from 'react'
import { deleteTask, fetchTasks } from '../api/UserService';

const Tasks = ({onNewTask, onEditTask}) => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const loadTasks = async() => {
      try {
        const response = await fetchTasks();
        setTasks(response.tasks || []);
      }
      catch(error) {
        console.log(error);
        setTasks([]);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async(id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div id="theTasks">
        <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <>
                {tasks.length > 0 ? (
                  tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.description}</td>
                      <td>{task.status}</td>
                      <td>{task.date}</td>
                      <td>{task.username?.username}</td>
                      <td>
                        <button onClick={() => onEditTask(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No tasks found</td>
                  </tr>
                )}
              </>
            </tbody>
        </table>
        <br/>
        <button onClick={onNewTask}>New</button>
    </div>
  )
}

export default Tasks
