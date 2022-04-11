import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePaginationAdmin';
import './Pagination.scss';

const PaginationAdmin = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    itemsPerPage,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    itemsPerPage
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <span className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
            disabled: currentPage === lastPage
        })}
        onClick={onNext}>
        <span className="arrow right" />
      </li>
    </ul>
  );
};

export default PaginationAdmin;
