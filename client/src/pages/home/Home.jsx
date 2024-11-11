import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Task from "../../components/task/Task";
import axios from "axios";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState([
    { name: "Pending", query: "pending", choosed: false },
    { name: "In Progress", query: "in_progress", choosed: false },
    { name: "Done", query: "done", choosed: false },
    { name: "All", query: null, choosed: true },
  ]);

  function chooseStatus(clicked) {
    setStatus((prev) =>
      prev.map((item) =>
        item.name === clicked
          ? { ...item, choosed: true }
          : { ...item, choosed: false }
      )
    );
  }

  React.useEffect(() => {
    (async () => {
      try {
        let url = "http://localhost:3000/tasks";
        status.map((op) => {
          if (op.choosed && op.query) {
            url = `${url}?status=${op.query}`;
          }
        });

        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [status]);

  return (
    <>
      <Navbar />

      <div className="row py-5 container" style={{ margin: "0 auto" }}>
        <div
          className="btn-group"
          style={{ width: "fit-content", color: "white" }}
        >
          <button type="button" className="btn btn-outline-secondary">
            Tasks{" "}
            <span className="badge text-bg-secondary">{data?.length}</span>
          </button>
        </div>

        <div
          className="btn-group"
          style={{ width: "fit-content", color: "white" }}
        >
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by: {status.map((op, index) => op.choosed && op.name)}
          </button>
          <ul className="dropdown-menu">
            {status.map((op, index) => (
              <li
                key={index}
                onClick={() => {
                  chooseStatus(op.name);
                }}
              >
                <button className="dropdown-item">{op.name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="row py-5 container" style={{ margin: "0 auto" }}>
          {data.map((item, index) => {
            return <Task item={item} key={index} setData={setData} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
