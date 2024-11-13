import React, { useState } from 'react'
import { newDepartments } from '../api/UserService';

const NewDepartment = ({handleClose}) => {
  const [newDepartment, setNewDepartment] = useState({name : ''});

  const handleChange = (e) => {
    setNewDepartment({...newDepartment, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await newDepartments(newDepartment);
      handleClose();
      alert("Department added successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='newDep'>
      <h2>New Department</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          autoComplete="off"
          required 
          value={newDepartment.name}
          onChange={handleChange}
          placeholder="Department name..." 
        />
        <button className='submit' type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewDepartment

