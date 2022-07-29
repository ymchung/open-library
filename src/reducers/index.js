import { IS_FETCHING, SET_BOOKS, SET_SEARCH_TEXT, SET_BOOK_DETAILS, SET_SELECTED_BOOK } from '../actions';

const appReducer = (state, action) => {
    switch (action.type) {
        case IS_FETCHING:
            return {
                ...state,
                isLoading: true,
                books: null,
                book: null,
                
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload.searchText
            };
        case SET_BOOKS:
            return {
                ...state,
                isLoading: false,
                book: null,
                books: { ...action.payload },
            };
        case SET_BOOK_DETAILS:
            return {
                ...state,
                isLoading: false,
                books: null,
                book: action.payload,
            };
        case SET_SELECTED_BOOK:
            return {
                ...state,
                book: {
                    ...state.book,
                    selectedBook: action.payload.bookKey
                },
            };
        default:
            return state;
    }
};

export default appReducer;