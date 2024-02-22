// Import các thư viện và component cần thiết
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./helper/users/login";
import ResetPassword from "./helper/users/reset_password";

// Component App với routing
function App() {
  return (
    <Router>
      <div className="container">
        <Login />
        <ResetPassword />
      </div>
    </Router>
  );
}

export default App;
