import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomsList from './RoomsList';
import { getAllRooms } from '../../Redux/Room/roomActions';
import Loading from '../Loading';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomsContainer = () => {
  const dispatch = useDispatch();
  const roomState = useSelector((state) => state.roomState);
  const { loading, rooms, error, total, pageSize } = roomState;

  const query = useQuery();
  const navigate = useNavigate();
  const page = parseInt(query.get('page')) || 1;

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    navigate(`/rooms?page=${newPage}`);
  };

  const paginatedRooms = rooms.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      {loading ? (
        <Loading message={'Rooms data loading...'} />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <RoomsList
          rooms={paginatedRooms}
          total={total}
          pageSize={pageSize}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default RoomsContainer;