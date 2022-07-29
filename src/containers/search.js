import { connect } from 'react-redux';
import Search from '../components/search';
import APIService from '../services/api';

import { IS_FETCHING, SET_BOOKS, SET_SEARCH_TEXT } from '../actions';

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });

const mapDispatchToProps = (dispatch) => ({
    fetchBooks: (value, page = 1) => {
        dispatch({ type: IS_FETCHING });
        dispatch({ type: SET_SEARCH_TEXT, payload: { searchText: value }})
        APIService.getBooks(value, page)
            .then(response => dispatch({
                type: SET_BOOKS,
                payload: {
                    currentPage: page,
                    booksNumFound: response.booksNumFound,
                    docs: response.docs,
            }}))
            .catch(e => console.error(e));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Search);
