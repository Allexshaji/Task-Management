import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../css/MyTasks.css";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchMyTasks = async () => {
    try {
      const res = await API.get("/tasks/mytasks");
      setTasks(res.data); 
    } catch (err) {
      console.log(err);
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchMyTasks();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "status-default";

    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "in progress":
        return "status-in-progress";
      default:
        return "status-default";
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>My Tasks</h1>
            <p>Manage, edit, and organize your own tasks.</p>
          </div>
        </header>

        <div className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any tasks yet.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <div className="task-header">
                  <h3>{task.title}</h3>

                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                <p className="task-desc">
                  {task.description || "No description provided."}
                </p>

                <div className="task-footer">
                  <div className="due-date">
                    <span>
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="task-timestamps">
                    <span>
                      Created:{" "}
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>

                    <span>
                      Updated:{" "}
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="card-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => navigate(`/edit-task/${task._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
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

export default MyTasks;