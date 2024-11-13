import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/styles.css"
import Profile from '../profile/Profile';
import Employees from '../users/Employees';
import Departments from '../departments/Departments';
import Tasks from '../tasks/Tasks';
import { useAuth } from '../context/AuthContext';
import { logout } from '../api/Auth';
import EditDepartment from '../departments/EditDepartment';
import NewDepartment from '../departments/NewDepartment';
import EditTask from '../tasks/EditTask';
import NewTask from '../tasks/NewTask';
import Modal from '../modal/Modal';

const Dashboard = () => {
  const { logout: logoutUser } = useAuth();
  const handleLogout = () => {
    logout();
    logoutUser();
    navigate('/login');
  };
  
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const [editDepartments, setEditDepartments] = useState(null);
  const [isEditDep, setIsEditDep] = useState(false);
  const [isNewDep, setIsNewDep] = useState(false);
  
  const [editTask, setEditTask] = useState(null);
  const [isEditTask, setIsEditTask] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  const handleClose = () => {
    setEditDepartments(null);
    setEditTask(null);
    setIsEditTask(false);
    setIsEditDep(false);
    setIsNewTask(false);
    setIsNewDep(false);
  }

  const handleEditTask = (task) => {
    setIsEditTask(true);
    setEditTask(task);
  }
  const handleEditPopup = (department) => {
    setIsEditDep(true);
    setEditDepartments(department);
  }

  const handleNewTask = () => {
    setIsNewTask(true);
  }
  const handleNewPopup = () => {
    setIsNewDep(true);
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <div className="dashboard">
                <h1>Duffenschmirtz Evil Incorporated</h1>
                <p>Offering rewards for bringing Perry the Platipus</p>
                <button type='button' onClick={handleLogout}>Log Out</button>
              </div>;
      case 'profile':
        return <Profile/>;
      case 'employees':
        return <Employees/>;
      case 'departments':
        return <Departments
          onNew = {handleNewPopup}
          onEdit = {handleEditPopup}
        />;
      case 'tasks':
        return <Tasks
          onNewTask = {handleNewTask}
          onEditTask = {handleEditTask}
        />;
      default:
        return  <div className="dashboard">
                  <h1>Duffenschmirtz Evil Incorporated</h1>
                  <p>Offering rewards for bringing Perry the Platipus</p>
                  <button type='button' onClick={handleLogout}>Log Out</button>
                </div>;
    }
  }

  return (
    <div id="theHome">
      <div className="menu">
        <button onClick={() => setActiveSection('home')}>Home</button><br/>
        <button onClick={() => setActiveSection('profile')}>Profile</button><br/>
        <button onClick={() => setActiveSection('employees')}>Employees</button><br/>
        <button onClick={() => setActiveSection('departments')}>Departments</button><br/>
        <button onClick={() => setActiveSection('tasks')}>Tasks</button><br/>
      </div>
      <div className="dashboard">
        {renderContent()}
      </div>

      {isEditDep && (
        <Modal show={isEditDep} handleClose={handleClose}>
          <EditDepartment department={editDepartments}/>
        </Modal>
      )}
      {isNewDep && (
        <Modal show={isNewDep} handleClose={handleClose}>
          <NewDepartment/>
        </Modal>
      )}

      {isEditTask && (
        <Modal show={isEditTask} handleClose={handleClose}>
          <EditTask task={editTask}/>
        </Modal>
      )}
      {isNewTask && (
        <Modal show={isNewTask} handleClose={handleClose}>
          <NewTask/>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
