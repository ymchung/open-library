import { connect } from 'react-redux';
import Book from '../components/book-details';
import APIService from '../services/api';

import { IS_FETCHING, SET_BOOK_DETAILS, SET_SEARCH_TEXT } from '../actions';

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });

const mapDispatchToProps = (dispatch) => ({
    fetchSelectedBook: selectedBookKey => {
        dispatch({ type: IS_FETCHING });
        dispatch({ type: SET_SEARCH_TEXT, payload: { searchText: '' }});
        APIService.getBookDetails(selectedBookKey)
            .then(data => {
                APIService.getAuthorData(data.authorKey)
                    .then(responseAuthor => {
                        dispatch({
                            type: SET_BOOK_DETAILS,
                            payload: {
                                selectedBook: selectedBookKey,
                                imageUrl: data.imageUrl,
                                title: data.title,
                                firstPublishYear: data.firstPublishYear,
                                authorName: data.authorName,
                                description: data.description,
                                authorBio: responseAuthor.bio,
                            }
                        });
                    })
                    .catch(e => console.error(e));
            })
            .catch(e => console.error(e));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Book)