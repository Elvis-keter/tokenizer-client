import { AuthProvider } from './components/context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import './App.css';
import Login from './components/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard"
              element={
                <ProtectedRoute><Dashboard/></ProtectedRoute>
              } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
