import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import HotelsList from './HotelsList';
import { getAllHotels } from '../../Redux/Hotel/hotelActions';
import Loading from '../Loading';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const HotelsContainer = () => {
  const dispatch = useDispatch();
  const hotelState = useSelector((state) => state.hotelState);
  const { loading, hotels, error, total, pageSize } = hotelState;

  const query = useQuery();
  const navigate = useNavigate();
  const page = parseInt(query.get('page')) || 1;

  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    navigate(`/hotels?page=${newPage}`);
  };

  const paginatedHotels = hotels.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      {loading ? (
        <Loading message={'Hotels data loading...'} />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <HotelsList
          hotels={paginatedHotels}
          total={total}
          pageSize={pageSize}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default HotelsContainer;