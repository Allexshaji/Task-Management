import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../css/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusClass = (status) => {
    if (!status) return "status-default";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "completed") return "status-completed";
    if (lowerStatus === "pending") return "status-pending";
    if (lowerStatus === "in progress") return "status-in-progress";
    return "status-default";
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome back, <span>{user?.name || "User"}</span></h1>
          <p>Here is an overview of your current tasks.</p>
        </header>

        <div className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found. You're all caught up!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status || "Unknown"}
                  </span>
                </div>
                
                <p className="task-desc">
                  {task.description || "No description provided."}
                </p>
                
                <div className="task-footer">
                  <div className="task-meta-row">
                    <small><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</small>
                  </div>
                  <div className="task-timestamps">
                    <small><strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}</small>
                    <small><strong>Updated:</strong> {new Date(task.updatedAt).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;