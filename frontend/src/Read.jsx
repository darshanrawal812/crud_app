import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Read() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>User Details</h2>
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
        <div>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
