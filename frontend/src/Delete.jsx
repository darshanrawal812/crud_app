import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function Delete() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = () => {
      axios
        .delete(`http://localhost:8081/delete/${id}`)
        .then((res) => {
          console.log(res.data);
          alert("User deleted successfully!");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete user. Please try again.");
        });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {/* <h2>Delete User</h2> */}
        <strong>
          <p>Are you sure you want to delete this user?</p>
        </strong>
        <div className="mb-2">
          <strong>ID:</strong> {user.id}
        </div>
        <div className="mb-2">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {user.phone}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
        <Link to={`/`} className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default Delete;
