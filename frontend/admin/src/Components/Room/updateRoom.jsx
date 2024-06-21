import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomById, updateRoom } from '../../Redux/Room/roomActions';
import { Alert } from 'react-bootstrap';

const UpdateRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomDetails = useSelector((state) => state.roomDetails || { room: {}, loading: false, error: null });
  const { room, loading, error } = roomDetails;

  const [roomData, setRoomData] = useState({
    roomName: '',
    hotelId: '',
    description: '',
    acreage: '',
    member: '',
    price: ''
  });
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (room && room.id === parseInt(id, 10)) {
      setRoomData({
        roomName: room.roomName || '',
        hotelId: room.hotelId || '',
        description: room.description || '',
        acreage: room.acreage || '',
        member: room.member || '',
        price: room.price || ''
      });
    }
  }, [room, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess('');
    try {
      await dispatch(updateRoom(id, roomData));
      setUpdateSuccess('Room updated successfully');
      navigate('/rooms');
    } catch (error) {
      setUpdateError('Failed to update room. ' + (error.message || ''));
    }
  };

  if (!id) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
            <div>
              <h1 className="display-4 text-center">Update Room</h1>
              <Alert variant="warning">Please go back to the rooms page and select a room to update.</Alert>
              <button className="btn btn-primary" onClick={() => navigate('/rooms')}>
                Back to Rooms
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Update Room</h1>
          </div>
          {updateError && <Alert variant="danger">{updateError}</Alert>}
          {updateSuccess && <Alert variant="success">{updateSuccess}</Alert>}
          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="roomName">Room Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={roomData.roomName}
                      onChange={handleInputChange}
                      name="roomName"
                      id="roomName"
                      placeholder="Room name."
                      required
                    />
                    <label htmlFor="hotelId">Hotel ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={roomData.hotelId}
                      onChange={handleInputChange}
                      name="hotelId"
                      id="hotelId"
                      placeholder="Hotel ID"
                      required
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      value={roomData.description}
                      onChange={handleInputChange}
                      name="description"
                      id="description"
                      placeholder="Description"
                      rows="3"
                      required
                    ></textarea>
                    <label htmlFor="acreage">Acreage</label>
                    <input
                      type="number"
                      className="form-control"
                      value={roomData.acreage}
                      onChange={handleInputChange}
                      name="acreage"
                      id="acreage"
                      placeholder="Acreage"
                      required
                    />
                    <label htmlFor="member">Member</label>
                    <input
                      type="number"
                      className="form-control"
                      value={roomData.member}
                      onChange={handleInputChange}
                      name="member"
                      id="member"
                      placeholder="Number of members"
                      required
                    />
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={roomData.price}
                      onChange={handleInputChange}
                      name="price"
                      id="price"
                      placeholder="Price"
                      required
                    />
                  </div>
                  <button className="btn btn-block btn-outline-primary" type="submit">
                    Update Room
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

export default UpdateRoom;