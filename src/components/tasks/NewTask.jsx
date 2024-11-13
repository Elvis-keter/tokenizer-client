import React, { useEffect, useState } from 'react'
import { fetchUsers, newTasks } from '../api/UserService';

const NewTask = ({handleClose}) => {
  const [newTask, setNewTask] = useState({
    description: '',
    status: '',
    date: '',
    assignTo: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async() => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      }
      catch(error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleChange = (e) => {
    setNewTask({...newTask, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await newTasks(newTask);
      handleClose();
      alert("Department added successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='newTask'>
      <h2>New Task</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='gridTask'>
          <div className='childGrid'>
            <label>Description</label>
            <input 
              type="text" 
              name="description"
              autoComplete="off"
              required 
              value={newTask.description}
              onChange={handleChange}
              placeholder="Description..."  
            />
          </div>
          <div className='childGrid'>
            <label>Status</label>
            <select id='status'>
              <option value={newTask.status}>In Progress</option>
              <option value={newTask.status}>Done</option>
            </select>
          </div>
        </div>
        <label>Due Date</label>
        <input 
          type="date" 
          name="date"
          autoComplete="off"
          required 
          value={newTask.date}
          onChange={handleChange}
          placeholder="Date..." 
        />
        <label>Assign To</label>
        <select id='assignTo' name='assignTo' value={newTask.assignTo} onChange={handleChange}>
          <option value=''>Select a user</option>
          {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option> 
          ))}
        </select>
        <button className='submit' type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewTask

