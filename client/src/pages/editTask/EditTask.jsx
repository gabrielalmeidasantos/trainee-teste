import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
        setStatus(response.data.status);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [id]);

  async function submitTask(event) {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, {
        name,
        description,
        status,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container col-md-8 mt-5">
        <h2>
          Edit task{" "}
          <Link className="btn btn-sm btn-primary" to="/">
            Back
          </Link>
        </h2>
        <br />
        <div className="card p-5">
          <form onSubmit={submitTask}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                onChange={({ target }) => setDescription(target.value)}
                value={description}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={({ target }) => setStatus(target.value)}
                value={status}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
