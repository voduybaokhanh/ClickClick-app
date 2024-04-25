import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from './user/Login';
import Register from './user/Register';
import List from './post/List';
import Block2 from './post/Block2';
import React, { useState } from 'react';
function App() {


  //doc thong tin user tu localStorage
  const getUserFromLocalStorgae = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  //luu user vao localStorage
  const saveUserToLocalStorgae = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  const [user, setUser] = useState(getUserFromLocalStorgae);

  //component phai dang nhap
  const ProtectedRoute = () => {
    if (user) {
      return <Outlet />
    }
    return <Navigate to="/login" />
  }
  //component ko can dang nhap
  const PublicRoute = () => {
    if (user) {
      return <Navigate to="/" />
    }
    return <Outlet />
  }


  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorgae} />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<List user={user} saveUser={saveUserToLocalStorgae} />} />
            <Route path="/block2" element={<Block2 user={user} saveUser={saveUserToLocalStorgae} />} />
          </Route>
        </Routes>
      </Router>
    </div >
  );
}


export default App;
