import React, { useEffect } from 'react';
import PropTypes, { arrayOf, string, shape, number, bool, func } from 'prop-types';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

import Pagination from '../pagination';
import Loading from '../loading';
import BookCard from '../book-card';


const namespace = 'book-list';

const Books = ({ books, searchText, isLoading, fetchBooks }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const bookParam = searchParams.get('q');

    useEffect(() => {
        if (bookParam) {
            const pageParam = searchParams.get('page') || 1;
            fetchBooks(bookParam, pageParam);
        }
    }, [bookParam]);

    const handleOnClickPage = selectedPage => {
        fetchBooks(searchText, selectedPage);
        const params = new URLSearchParams(location.search);
        const objParams = {};
        for (let p of params) {
            objParams[p[0]] = p[1];
          }
        setSearchParams({...objParams, page: selectedPage});
    }

    const handleOnBook = (e, k) => {
        e.preventDefault();
        const bookKey = k.replace(new RegExp('.*' + '/works/'), '');
        navigate(`/book/${bookKey}`);
    };

    return (
        <div className={`${namespace} row`}>
            {isLoading && <Loading />}
            {books && books.docs && !!books.docs.length && books.docs.map(book => 
                <BookCard 
                    key={book.key}
                    book={book.key}
                    title={book.title}
                    authorName={book.author_name}
                    year={book.first_publish_year}
                    handleOnBook={handleOnBook}
                />)}
            {!isLoading && books && books.booksNumFound === 0 && <p>Lo sentimos, no encontramos resultados</p>}
            {books && <Pagination currentPage={books.currentPage} total={books.booksNumFound} pageLimit={100} onPageChange={handleOnClickPage} />}
        </div>
    );  
};

Books.propTypes = {
    books: shape({
        docs: arrayOf(shape({
            key: string,
            title: string,
            first_publish_year: number,
            author_name: string,
        })),
        currentPage: number,
        booksNumFound: number,
    }),
    isLoading: bool,
    searchText: string,
    fetchBooks: func.isRequired,
};

Books.defaultProps = {
    books: null,
    isLoading: false,
    searchText: null,
};

export default Books;