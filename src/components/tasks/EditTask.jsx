import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTasksById, fetchUsers, updateTasks } from '../api/UserService';

const EditTask = ({handleClose, task}) => {
  const [tasks, setTasks] = useState({
    description: '',
    status: '',
    date: '',
    assignTo: ''
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setTasks({...tasks, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if (task) {
      setTasks({
        description: task.description || '',
        status: task.status || '',
        date: task.date || '',
        assignTo: task.assignTo || ''
      })
    }

    const loadUsers = async () => {
      try {
        const edit = await fetchUsers();
        setUsers(edit);
      } catch (error) {
        console.log(error);
      }
    }
    loadUsers();

    const fetchById = async(id) => {
      try {
        const edit = await updateTasks(id, tasks);
        return edit.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  }, [task]);

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      await updateTasks(task.id, tasks);
      alert("Task updated successfully");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='editTask'>
      <h2>Update Department</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='gridTask'>
          <div className='childGrid'>
            <label>Description</label>
            <input 
              type="text" 
              name="description"
              autoComplete="off"
              required 
              value={tasks.description}
              onChange={handleChange}
              placeholder="Description..."  
            />
          </div>
          <div className='childGrid'>
            <label>Status</label>
            <select id='assignTo' name='assignTo' value={tasks.assignTo} onChange={handleChange}>
              <option value='In Progress'>In Progress</option>
              <option value='Done'>Done</option>
            </select>
          </div>
        </div>
        {/* <input 
          type="text" 
          name="status"
          autoComplete="off"
          required 
          value={tasks.status}
          onChange={handleChange}
          placeholder="Status..." 
        /> */}
        <label>Due Date</label>
        <input 
          type="date" 
          name="date"
          autoComplete="off"
          required 
          value={tasks.date}
          onChange={handleChange}
          placeholder="Date..." 
        />
        <label>Assign To</label>
        <select id='assignTo' name='assignTo' onChange={handleChange} value={tasks.assignTo}>
          <option value=''>Select an existing user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <button className='submit' type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditTask
