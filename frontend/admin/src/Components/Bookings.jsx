import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Pagination from "./Pagination";
import { getBookings, updateBookingStatus } from "../Redux/Booking/bookingActions";

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Accepted" ? "green" : "")};
  color: ${(props) => (props.type === "Rejected" ? "red" : "")};
`;

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, total, page, pageSize, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getBookings(page, pageSize));
  }, [dispatch, page, pageSize]);

  const handlePageChange = (pageNumber) => {
    dispatch(getBookings(pageNumber, pageSize));
  };

  const updateBooking = (bookingId, status) => {
    dispatch(updateBookingStatus(bookingId, status));
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookings.length > 0 ? (
        <>
          <Table
            striped
            bordered
            hover
            size="sm"
            style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Room Name</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Hotel Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.email}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.roomName}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td>{booking.hotelName}</td>
                  <StatusTD type={booking.status}>{booking.status}</StatusTD>
                  {booking.status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Accepted")}
                        />
                        <FaTimesCircle
                          color="red"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            marginLeft: "10px",
                          }}
                          onClick={() => updateBooking(booking.id, "Rejected")}
                        />
                      </td>
                    </>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination totalPages={Math.ceil(total / pageSize)} currentPage={page} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">No bookings.</h1>
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  No Bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;