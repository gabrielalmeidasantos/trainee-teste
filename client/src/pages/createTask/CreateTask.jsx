import React from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");

  const navigate = useNavigate();

  async function submitTask(event) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3000/tasks", {
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
          Create task{" "}
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
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
                value={name}
                required
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="exampleInputPassword1"
                name="description"
                required
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

export default CreateTask;
