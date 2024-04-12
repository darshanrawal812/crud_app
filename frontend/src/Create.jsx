// import React from "react";

// function Create() {
//   return(
//     <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//         <div className="w-50 bg-white rounded p-3">
//             <form>
//                 <h2>Add User</h2>
//                 <div className="mb-2">
//                     <label>Name</label>
//                     <input type="text" placeholder="Enter Name" className="form-control" />
//                 </div>
//                 <div className="mb-2">
//                     <label>Phone</label>
//                     <input type="phone" placeholder="Enter Phone" className="form-control" />
//                 </div>
//                 <div className="mb-2">
//                     <label>Email</label>
//                     <input type="email" placeholder="Enter Email" className="form-control" />
//                 </div>
//                 <button className="btn btn-success">Submit</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Create;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/users", values)
      .then((res) => {
        console.log(res.data);
        alert("User added successfully!");
        // Clear the form after successful submission
        setValues({
          name: "",
          phone: "",
          email: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add user. Please try again.");
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
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
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
