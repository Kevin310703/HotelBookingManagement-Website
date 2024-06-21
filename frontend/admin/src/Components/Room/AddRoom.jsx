import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const AddRooms = () => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [description, setDescription] = useState("");
  const [acreage, setAcreage] = useState("");
  const [member, setMember] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addRoom = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming the token is stored in local storage
      const response = await axios.post(
        "http://213.136.80.48:8889/api/room",
        {
          roomName,
          hotelId: parseInt(hotelId, 10),
          description,
          acreage: parseInt(acreage, 10),
          member: parseInt(member, 10),
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Room added successfully");
        setRoomName("");
        setHotelId("");
        setDescription("");
        setAcreage("");
        setMember("");
        setPrice("");
        navigate("/rooms");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError("Server error: " + error.response.data.message);
      } else {
        setError("Failed to add room. " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    addRoom();
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Add Room</h1>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="roomName">Room Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      id="roomName"
                      placeholder="Room name."
                      required
                    />
                    <label htmlFor="hotelId">Hotel ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={hotelId}
                      onChange={(e) => setHotelId(e.target.value)}
                      id="hotelId"
                      placeholder="Hotel ID"
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
                    <label htmlFor="acreage">Acreage</label>
                    <input
                      type="number"
                      className="form-control"
                      value={acreage}
                      onChange={(e) => setAcreage(e.target.value)}
                      id="acreage"
                      placeholder="Acreage"
                      required
                    />
                    <label htmlFor="member">Member</label>
                    <input
                      type="number"
                      className="form-control"
                      value={member}
                      onChange={(e) => setMember(e.target.value)}
                      id="member"
                      placeholder="Number of members"
                      required
                    />
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      id="price"
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="form-group form-check"></div>
                  <button className="btn btn-block btn-outline-primary" type="submit">
                    ADD ROOM
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

AddRooms.propTypes = {
  roomName: PropTypes.string,
  hotelId: PropTypes.number,
  description: PropTypes.string,
  acreage: PropTypes.number,
  member: PropTypes.number,
  price: PropTypes.number,
  error: PropTypes.string,
  success: PropTypes.string,
};

export default AddRooms;