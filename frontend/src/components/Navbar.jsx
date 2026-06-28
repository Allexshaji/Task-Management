import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/Navbar.css"; 

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="logo">
          <h2>Task Manager</h2>
        </div>

        <div className="nav-links">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/create-task" className={isActive("/create-task")}>
            Create Task
          </Link>
          <Link to="/my-tasks" className={isActive("/my-tasks")}>
            My Tasks
          </Link>
        </div>
        
        <div className="nav-actions">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;