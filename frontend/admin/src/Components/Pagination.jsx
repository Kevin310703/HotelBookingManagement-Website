import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav>
      <ul className="pagination" style={{ justifyContent: 'center' }}>
        {[...Array(totalPages).keys()].map((i) => (
          <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;