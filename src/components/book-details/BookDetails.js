import React, { useEffect } from 'react';
import { shape, string, number, bool, func } from 'prop-types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import Loading from '../loading';

const namespace = 'book-details';

const Book = ({ book, isLoading, fetchSelectedBook }) => {
    let { bookId } = useParams();

    useEffect(() => {
        fetchSelectedBook(bookId);
    }, [bookId]);

    return (
        <div className={classNames(namespace, 'row')}>
            {isLoading && <Loading />}
            {!isLoading && book && (
                <>
                    <div className={classNames(`${namespace}__image-container`, 'col-md-3')}>
                        {book.imageUrl ? (<img src={book.imageUrl} className={`${namespace}__image`} alt="Portada del libro"/>) :
                        (<div className={`${namespace}__no-image`}>IMAGEN NO DISPONIBLE</div>)}
                    </div>
                    <div className={classNames(`${namespace}__description-container`, 'col-md-9')}>
                        {book.title && <h3 className={`${namespace}__title`}>{book.title}</h3>}
                        {book.authorName && <p className={`${namespace}__author`}>escrito por <i>{book.authorName}</i></p>}
                        {book.firstPublishYear && <p className={`${namespace}__publish-year`}>Publicado por primera vez en {book.firstPublishYear}</p>}
                        {book.description && (
                            <div className={`${namespace}__info-container`}>
                                <h4 className={`${namespace}__info-container-title`}>Descripción del libro</h4>
                                <p className={`${namespace}__info-container-text`}>{book.description}</p>
                            </div>
                        )}
                        {book.authorBio && (
                            <div className={`${namespace}__info-container`}>
                                <h4 className={`${namespace}__info-container-title`}>Sobre el autor</h4>
                                <p className={`${namespace}__info-container-text`}>{book.authorBio}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

Book.propTypes = {
    book: shape({
        title: string,
        firstPublishYear: number,
        authorName: string,
        imageUrl: string,
        authorKey: string,
        description: string,
        authorBio: string,
    }),
    isLoading: bool,
    fetchSelectedBook: func.isRequired,
};

Book.defaultProps = {
    book: null,
    isLoading: true,
};

export default Book;

