import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5050',
});

export const fetchUsers = async() => {
    try {
        const response = await API.get('/admin/users');
        if(Array.isArray(response.data)) {
            return response.data;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`); 
};

export const fetchDepartments = async() => {
    const departments = await API.get('/admin/departments');
    return departments.data;
}

export const fetchDepartmentById = async(id) => {
    try {
        const getId = await API.get(`/admin/departments/${id}`);
        return getId.data;
    }
    catch(error) {
        console.log(error);
    }
}

export const updateDepartments = async (id, departmentData) => {
    try {
      const response = await API.post(`/admin/departments/update/${id}`, departmentData);
      return response.data;
    } catch (error) {
      console.error("Error updating department", error);
      throw error;
    }
};
  
export const newDepartments = async(departmentData) => {
    try {
        const newDep = await API.post('/admin/departments', departmentData);
        return newDep.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteDepartment = async (id) => {
    const deleteDep = await API.delete(`/admin/departments/delete/${id}`); 
    return deleteDep.data;
};

//tasks

export const fetchTasks = async() => {
    const tasks = await API.get('/manager/tasks');
    return tasks.data;
}

export const fetchTasksById = async(id) => {
    try {
        const editTask = await API.get(`/manager/tasks/${id}`);
        return editTask.data;
    } catch (error) {
        console.log(error);
    }
}

export const newTasks = async(taskData) => {
    try {
        const newTask = await API.post(`/manager/tasks`, taskData);
        return newTask.data;
    } catch (error) {
        console.log(error);
        
    }
}

export const updateTasks = async(id, taskData) => {
    try {
        const editTask = await API.post(`/manager/tasks/update/${id}`, taskData);
        return editTask.data; 
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = async (id) => {
    const deleteTask = await API.delete(`/manager/tasks/delete/${id}`); 
    return deleteTask.data;
};
