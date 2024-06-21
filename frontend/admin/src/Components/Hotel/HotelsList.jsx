import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';

const HotelsList = ({ hotels, total, pageSize, page, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <table className="table table-bordered" style={{ marginTop: '100px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel Name</th>
            <th>Address</th>
            <th>Description</th>
            <th>Rate</th>
            <th>Rooms</th>
            <th>Services</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={`${hotel.id}-${index}`}>
              <td>{hotel.id}</td>
              <td>{hotel.hotelName}</td>
              <td>{hotel.address}</td>
              <td>{hotel.description}</td>
              <td>{hotel.rate}</td>
              <td>{hotel.rooms ? hotel.rooms.join(', ') : 'N/A'}</td>
              <td>{hotel.services ? hotel.services.join(', ') : 'N/A'}</td>
              <td>
                <Link to={`/updateHotel/${hotel.id}`} className="btn btn-block btn-outline-primary">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange} />
    </>
  );
};

HotelsList.propTypes = {
  hotels: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default HotelsList;