import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/edit/${id}`, user)
      .then((res) => {
        console.log(res.data);
        alert("User updated successfully!");
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update user. Please try again.");
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label>Phone</label>
            <input
              type="phone"
              placeholder="Enter Phone"
              className="form-control"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <Link to={`/`} className="btn btn-danger ms-2">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Edit;
