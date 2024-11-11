import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Task = ({ item, setData }) => {
  async function deleteTask() {
    try {
      let url = `http://localhost:3000/tasks/${item.id}`;
      await axios.delete(url);

      setData((prevState) => prevState.filter((task) => task.id !== item.id));
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="col-sm-6 mb-3 mb-sm-0">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <span
                style={{ textTransform: "capitalize" }}
                className={`badge rounded-pill 
              ${item.status == "pending" && "text-bg-warning"} 
              ${item.status == "in_progress" && "text-bg-info"}
              ${item.status == "done" && "text-bg-success"}`}
              >
                {item.status}
              </span>
            </div>
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <hr />
            <div className="row" style={{ gap: "1rem", padding: ".5rem" }}>
              <Link
                to={`/edit/${item.id}`}
                className="btn btn-outline-primary"
                style={{ width: "fit-content" }}
              >
                Edit task
              </Link>
              <button
                onClick={deleteTask}
                className="btn btn-outline-danger"
                style={{ width: "fit-content" }}
              >
                Delete task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
