import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';

const RoomsList = ({ rooms, total, pageSize, page, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <table className="table table-bordered" style={{ marginTop: '100px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel ID</th>
            <th>Room Name</th>
            <th>Hotel Name</th>
            <th>Description</th>
            <th>Acreage</th>
            <th>Member</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={`${room.id}-${index}`}>
              <td>{room.id}</td>
              <td>{room.hotelId}</td>
              <td>{room.roomName}</td>
              <td>{room.hotelName}</td>
              <td>{room.description}</td>
              <td>{room.acreage}</td>
              <td>{room.member}</td>
              <td>{room.price}</td>
              <td>
                <Link to={`/updateRoom/${room.id}`} className="btn btn-block btn-outline-primary">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange} />
    </>
  );
};

RoomsList.propTypes = {
  rooms: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default RoomsList;