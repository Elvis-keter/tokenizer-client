import React, { useEffect, useState } from 'react'
import { fetchDepartmentById, updateDepartments } from '../api/UserService';
import '../../css/styles.css'
import { useParams } from 'react-router-dom';

const EditDepartment = ({department, handleClose}) => {
  const [departments, setDepartments] = useState(department || {name : ''}); 
  const {id} = useParams();

  const handleChange = (e) => {
    setDepartments({...departments, [e.target.name]: e.target.value});
  }
  
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const departmentData = await fetchDepartmentById(id);
        if(departmentData) {
          setDepartments(departmentData);
        }
        else {
          setDepartments({name:''});
        }
      }
      catch(error) {
        console.log(error);
        setDepartments({name: ''});
      }
    };

    if(id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await updateDepartments(department.id, departments);
      handleClose();
      alert("Department updated successfully");
    }
    catch(err) {
      console.log(err);
    }
    
  }
  return (
    <div className='editDep'>
      <h2>Update Department</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          autoComplete="off"
          required 
          value={departments.name}
          onChange={handleChange}
          placeholder="Department name..." 
        />
        <button className='submit' type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditDepartment
