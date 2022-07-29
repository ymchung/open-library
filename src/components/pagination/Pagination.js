import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getRangeNumbers from '../../utils/getRangeNumbers';

const namespace = 'paginator';

const DOTS = '...';

const getPaginatorPages = (pages, currentPage) => {
    let paginatorPages = [];

    if (pages < 6) {
        paginatorPages = getRangeNumbers(1, pages);
    } else {
        if (currentPage > 5 && currentPage < (pages-2)) {
            paginatorPages = [1, DOTS, currentPage, DOTS, pages];
        } else if (currentPage >= (pages-2)) {
            paginatorPages = [1, DOTS, ...getRangeNumbers(pages-2, pages)];
        } else {
            paginatorPages = [...getRangeNumbers(1, 5), DOTS, pages];
        }
    }

    return paginatorPages;
};

const Pagination = ({ currentPage, total, pageLimit, onPageChange }) => {

    if (total/pageLimit <= 1) return null;

    const pages = Math.ceil(total / pageLimit);
    const paginatorPages = getPaginatorPages(pages, parseInt(currentPage));
    
    const handleOnClickPage = (e, page) => {
        e.preventDefault();
        if (page !== currentPage) {
            onPageChange(page);
        }
    }
        
    return (
        <nav className={namespace} aria-label="Paginacion de libros encontrados">
            <ul className="pagination">
                {currentPage !== 1 && <li className="page-item">
                    <a className="page-link" href="/#" onClick={e => handleOnClickPage(e, currentPage-1)} aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>}
                {paginatorPages.map(n => {
                    const isCurrentPage = parseInt(currentPage) === n;
                    return (
                        Number.isInteger(n) ? (
                            <li className="page-item" key={n}>
                                <a
                                    className={classNames('page-link', {'active' : isCurrentPage})}
                                    href="/#"
                                    onClick={e => handleOnClickPage(e, n)}
                                    data-testid={`${namespace}__link-${n}`}
                                    >
                                        {n}
                                </a>
                            </li>
                        ) : (
                            <li className="page-item" key={n}>
                                <span className="page-link">...</span>
                            </li>
                        )
                )})}
                {(currentPage !== pages) && <li className="page-item">
                    <a className="page-link" href="/#" onClick={e => handleOnClickPage(e, currentPage+1)} aria-label="Siguiente">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    pageLimit: PropTypes.number,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    total: PropTypes.number,
};

Pagination.defaultProps = {
    pageLimit: 100,
    onPageChange: () => {},
    currentPage: 1,
    total: 0,
};

export default Pagination;