import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/styles.css";
import { fetchUsers, deleteUser } from '../api/UserService'; 

const Employees = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        if(response && Array.isArray(response)) {
          setUsers(response);
        }
        else {
          setUsers([]);
        }
        
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // API call to delete user
      setUsers(users.filter(user => user.id !== id)); // Remove user from state after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Navigate to Assign Manager or Employee
  const handleAssignRole = (id, role) => {
    navigate(`/admin/users/assign-${role}/${id}`);
  };

  return (
    <div id="theUsers">
      <h1>User Management</h1>

      <table id="usersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleAssignRole(user.id, 'manager')}>Assign Manager</button>
                  <button onClick={() => handleAssignRole(user.id, 'employee')}>Assign Employee</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
          </>
        </tbody>
      </table>
      
      <br />
      <button onClick={() => navigate('/admin/users/new')}>New</button>
    </div>
  );
};

export default Employees;
