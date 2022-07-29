import { connect } from 'react-redux';
import Books from '../components/book-list';
import APIService from '../services/api';

import { IS_FETCHING, SET_BOOKS, SET_SEARCH_TEXT, SET_SELECTED_BOOK } from '../actions';

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });

const mapDispatchToProps = (dispatch) => ({
    fetchBooks: (value, page) => {
        dispatch({ type: IS_FETCHING });
        dispatch({ type: SET_SEARCH_TEXT, payload: { searchText: value }})
        APIService.getBooks(value, page)
            .then(response => dispatch({ 
                type: SET_BOOKS,
                payload: { 
                    currentPage: page,
                    docs: response.docs,
                    booksNumFound: response.booksNumFound
                }
            }))
            .catch(e => console.error(e));
    },
    setSelectedBook: bookKey => dispatch({ type: SET_SELECTED_BOOK, payload: { bookKey }}),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Books)