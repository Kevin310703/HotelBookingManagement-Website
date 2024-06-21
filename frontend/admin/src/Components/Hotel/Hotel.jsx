// src/Components/Room.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Room = ({ room }) => {
    if (!room) {
        return null;
    }
    return (
        <div className="col-4 mb-4">
            <div className="card">
                <img src={room.images[0]} alt={room.name} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text">{room.description}</p>
                </div>
            </div>
        </div>
    );
};

Room.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default Room;