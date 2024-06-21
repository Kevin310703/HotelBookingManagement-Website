import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';

const AddUser = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [identity, setIdentity] = useState('');
  const [phone, setPhone] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availableRoles = ['ADMIN', 'USER'];

  const addUser = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in local storage
      const response = await axios.post(
        'http://213.136.80.48:8889/api/user',
        {
          fullName,
          email,
          password,
          address,
          identity,
          phone,
          roles,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      if (response.status === 200) {
        setSuccess('User added successfully');
        setFullName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setIdentity('');
        setPhone('');
        setRoles([]);
        navigate('/users');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError('Server error: ' + error.response.data.message);
      } else {
        setError('Failed to add user. ' + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRoles([...roles, value]);
    } else {
      setRoles(roles.filter((role) => role !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    addUser();
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Add User</h1>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      id="fullName"
                      placeholder="Full name"
                      required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      placeholder="Address"
                      required
                    />
                    <label htmlFor="identity">Identity</label>
                    <input
                      type="text"
                      className="form-control"
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                      id="identity"
                      placeholder="Identity"
                      required
                    />
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                      placeholder="Phone"
                      required
                    />
                    <label htmlFor="roles">Role</label>
                    <div>
                      {availableRoles.map((role) => (
                        <Form.Check
                          type="checkbox"
                          key={role}
                          id={`role-${role}`}
                          label={role}
                          value={role}
                          checked={roles.includes(role)}
                          onChange={handleRoleChange}
                        />
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-block btn-outline-primary" type="submit">
                    Add User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;