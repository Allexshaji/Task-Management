import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../css/CreateTask.css";

function CreateTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", task);
      alert("Task Created Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <>
    <Navbar />
    <div className="create-task-layout">
      <div className="form-card">
        <div className="form-header">
          <h2>Create New Task</h2>
          <p>Define your task details below to add it to the board.</p>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          
          <div className="form-group full-width">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Update landing page copy"
              value={task.title}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add any helpful details, links, or context..."
              value={task.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* Status and Due Date side-by-side for a balanced layout */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <div className="select-wrapper">
              <select
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions full-width">
            <button type="button" className="btn-secondary" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Task
            </button>
          </div>
          
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateTask;