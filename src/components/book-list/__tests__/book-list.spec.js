import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import BookList from '../BookList';

describe('BookList Component', () => {
    const props = {
        books: {
            docs: [
                {
                    key: 'A123B',
                    title: 'Harry Potter',
                    first_publish_year: 1999,
                    author_name: 'J. K. Rowling',
                },
                {
                    key: 'A321C',
                    title: 'Harry Potter 2',
                    first_publish_year: 2000,
                    author_name: 'J. K. Rowling',
                },
            ],
            currentPage: 1,
            booksNumFound: 2,
        },
        isLoading: true,
        searchText: 'Harry',
        fetchBooks: jest.fn(),
    }

    test('Component should render correctly', () => {
        const history = createMemoryHistory();
        const { container } = render(
            <Router location={history.location}>
                <BookList {...props} />
            </Router>
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});