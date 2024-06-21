import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const NoRoomSelected = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Update Room</h1>
            <Alert variant="warning" className="text-center">Please go back to the rooms page and select a room to update.</Alert>
            <button className="btn btn-block btn-outline-primary" onClick={() => navigate('/rooms')}>
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoRoomSelected;