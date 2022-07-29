import React from 'react';
import { string, number, func } from 'prop-types';

const namespace = 'book-card';

const BookCard = ({ book, title, authorName, year, handleOnBook }) => (
    <div className={`${namespace} card`}>
        <div className="card-body">
            <a href="/#" className={`${namespace}__link`} onClick={e => handleOnBook(e, book)} data-testid={`${namespace}__link`}>
                <h3 className={`${namespace}__title`}>{title}</h3>
                <p className={`${namespace}__subtitle`}>de {authorName}</p>
                <p className={`${namespace}__text`}>Publicado por primera vez en {year}</p>
            </a>
        </div>
    </div>
);

BookCard.propTypes = {
    book: string,
    title: string,
    authorName: string,
    year: number,
    handleOnBook: func.isRequired,
};

export default BookCard;