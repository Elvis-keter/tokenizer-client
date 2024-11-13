import React, { useEffect, useState } from 'react'
import { deleteDepartment, fetchDepartments } from '../api/UserService';

const Departments = ({onNew, onEdit}) => {
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    const loadDepartments = async() => {
      try {
        const response = await fetchDepartments();
        if(response && Array.isArray(response)) {
          setDepartments(response);
        }
        else {
          setDepartments([]);
        }
      }
      catch(error) {
        console.log(error);
        setDepartments([]);
      }
    };
    loadDepartments();
  }, []);

  const handleDelete = async(id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter(department => department.id !== id));
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div id="theDep">
        <table>
            <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {departments.length > 0 ? (
              departments.map(department => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.name}</td>
                  <td>
                    <button onClick={() => onEdit(department)}>Edit</button>
                    <button onClick={() => handleDelete(department.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No departments found</td>
              </tr>
            )}
            </tbody>
        </table>
        <br/>
        <button onClick={onNew}>New</button>
    </div>
  )
}

export default Departments
