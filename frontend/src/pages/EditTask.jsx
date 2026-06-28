import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "../css/EditTask.css"; 

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);

      setTask({
        title: res.data.title,
        description: res.data.description,
        status: res.data.status,
        dueDate: res.data.dueDate ? res.data.dueDate.substring(0, 10) : "",
      });
    } catch (err) {
      console.log(err);
      alert("Unable to load task details");
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/tasks/${id}`, task);
      alert("Task Updated Successfully");
      navigate("/my-tasks"); 
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="edit-task-layout">
      <div className="form-card">
        <div className="form-header">
          <h2>Edit Task</h2>
          <p>Update the details of your task below.</p>
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
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate("/my-tasks")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Task
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default EditTask;