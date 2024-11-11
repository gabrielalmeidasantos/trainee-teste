import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Toast from "../../components/toast/Toast";

const EditTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const { id } = useParams();

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

      setToastMessage("Updated!");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Failed.");
      setToastType("error");
      setShowToast(true);
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      setShowToast(false);
    };
  }, []);

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

      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default EditTask;
