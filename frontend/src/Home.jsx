// import { useState } from "react";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Home() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/")
//       .then((res) => setData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//       <div className="w-50 bg-white rounded p-3">
//         <h2>Users</h2>
//         <div className="d-flex justify-content-end">
//           <Link to="/create" className="btn btn-success">
//             Create +
//           </Link>
//         </div>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.email}</td>
//                 <td>
//                   <Link to={`/user/${item.id}`} className="btn btn-sm btn-info">
//                     Read
//                   </Link>
//                   <Link to={`/edit/${item.id}`} className="btn btn-sm btn-primary mx-2">
//                     Edit
//                   </Link>
//                   <Link to={`/delete/${item.id}`} className="btn btn-sm btn-danger">
//                     Delete
//                   </Link>

//                   {/* <button className="btn btn-sm btn-danger">Delete</button> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Users</h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.id}</td> */}
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/user/${item.id}`} className="btn btn-sm btn-info">
                    Read
                  </Link>
                  <Link
                    to={`/edit/${item.id}`}
                    className="btn btn-sm btn-primary mx-2"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/delete/${item.id}`}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
