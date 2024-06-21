import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelById, updateHotel } from '../../Redux/Hotel/hotelActions';
import { Alert } from 'react-bootstrap';

const UpdateHotel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotelDetails = useSelector((state) => state.hotelDetails || { hotel: {}, loading: false, error: null });
  const { hotel, loading, error } = hotelDetails;

  const [hotelData, setHotelData] = useState({
    hotelName: '',
    address: '',
    description: '',
  });
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getHotelById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (hotel && hotel.id === parseInt(id, 10)) {
      setHotelData({
        hotelName: hotel.hotelName || '',
        address: hotel.address || '',
        description: hotel.description || '',
      });
    }
  }, [hotel, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess('');
    try {
      await dispatch(updateHotel(id, hotelData));
      setUpdateSuccess('Hotel updated successfully');
      navigate('/hotels');
    } catch (error) {
      setUpdateError('Failed to update hotel. ' + (error.message || ''));
    }
  };

  if (!id) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
            <div>
              <h1 className="display-4 text-center">Update Hotel</h1>
              <Alert variant="warning">Please go back to the hotels page and select a hotel to update.</Alert>
              <button className="btn btn-primary" onClick={() => navigate('/hotels')}>
                Back to Hotels
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
            <h1 className="display-4 text-center">Update Hotel</h1>
          </div>
          {updateError && <Alert variant="danger">{updateError}</Alert>}
          {updateSuccess && <Alert variant="success">{updateSuccess}</Alert>}
          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="hotelName">Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotelData.hotelName}
                      onChange={handleInputChange}
                      name="hotelName"
                      id="hotelName"
                      placeholder="Hotel name"
                      required
                    />
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotelData.address}
                      onChange={handleInputChange}
                      name="address"
                      id="address"
                      placeholder="Address"
                      required
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      value={hotelData.description}
                      onChange={handleInputChange}
                      name="description"
                      id="description"
                      placeholder="Description"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button className="btn btn-block btn-outline-primary" type="submit">
                    Update Hotel
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

export default UpdateHotel;