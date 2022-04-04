import React from 'react';

export default function SortProduct({ handleSortAsc, handleSortDesc }) {
  return (
    <div className="filter-box">
      <div
        className="asc-price"
        id="sort-asc-phone"
        onClick={() => handleSortAsc('asc')}
      >
        {' '}
        <i className="fas fa-sort-amount-up"></i>Giá thấp
      </div>
      <div
        className="desc-price"
        id="sort-desc-phone"
        onClick={() => handleSortDesc('desc')}
      >
        <i className="fas fa-sort-amount-up-alt"></i>Giá cao
      </div>
    </div>
  );
}
