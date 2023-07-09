import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../CssNew/admin.css'

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [trainingDate, setTrainingDate] = useState("");
  const [trainingLength, setTrainingLength] = useState("");
  const [trainingCocher, setTrainingCocher] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/getusers');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users', response);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const training = { trainingDate, trainingLength, trainingCocher };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ training }),
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    checkUserRole();
    fetchData();
  }, []);

  const checkUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/users/admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setIsAdmin(data.isAdmin);
      } else {
      }
    } catch (error) {
    }
  };

  if (!isAdmin) {
    return (
      <div>
        <h1>Access denied. You are not an admin.</h1>
      </div>
    );
  }

  return (
    <div className="className1">
    <h1 className="className2">Welcome, Admin!</h1>
    <button onClick={() => navigate('/')}>Go Back</button>
      <nav className="className3">
                    <ul className="className4">
                        <li><a href="/users">Users</a></li>
                        <li><a href="/settings">Settings</a></li>
                        <li><a href="/logs">Logs</a></li>
                    </ul>
                </nav>

                <main className="className5">
                <section className="className6">
                  <h2>User list</h2>
                {users && users.map((user, index) => (
                <div key={index}>
                 <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                 <p>Role: {user.role}</p>
                </div>
                 ))}
              </section>   

                    <section className="className7">
                        <h2>Settings</h2>
                        {}
                    </section>

                    <section className="className8">
                        <h2>Logs</h2>
                        {}
                    </section>
                    
                    <section className="className9">
                      <h2>Create Training</h2>
                        <form onSubmit={handleSubmit}>
                          <label>
                            Training Date:
                              <input type="date" value={trainingDate} onChange={e => setTrainingDate(e.target.value)} />
                          </label>
                          <label>
                          Training Length:
                          <input type="number" value={trainingLength} onChange={e => setTrainingLength(e.target.value)} />
                         </label>
                          <label>
                          Training Cocher:
                       <input type="text" value={trainingCocher} onChange={e => setTrainingCocher(e.target.value)} />
                        </label>
                        <button type="submit">Create Training</button>
                        </form>
                    </section>

                </main>
    </div>
  );
};

export default AdminPanel;

