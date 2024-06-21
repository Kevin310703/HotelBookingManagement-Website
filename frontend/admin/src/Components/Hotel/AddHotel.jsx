import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const AddHotel = () => {
  const navigate = useNavigate();

  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addHotel = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://213.136.80.48:8889/api/hotel",
        {
          hotelName,
          address,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Hotel added successfully");
        setHotelName("");
        setAddress("");
        setDescription("");
        navigate("/hotels");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError("Server error: " + error.response.data.message);
      } else {
        setError("Failed to add hotel. " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    addHotel();
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Add Hotel</h1>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="hotelName">Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      id="hotelName"
                      placeholder="Hotel name"
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
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                      placeholder="Description"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button className="btn btn-block btn-outline-primary" type="submit">
                    ADD HOTEL
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

export default AddHotel;