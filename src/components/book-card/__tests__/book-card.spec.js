import { render, fireEvent } from '@testing-library/react';
import BookCard from '../BookCard';

describe('BookCard Component', () => {
    const props = {
        book: 'AB123',
        title: 'Harry Potter',
        authorName: 'J. K. Rowling',
        year: 1999,
        handleOnBook: jest.fn(),
    }

    test('Component should render correctly', () => {
        const { container } = render(<BookCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('On click component should call handleOnBook function', () => {
        const { getByTestId } = render(<BookCard {...props} />);
        fireEvent.click(getByTestId('book-card__link'));

        expect(props.handleOnBook).toHaveBeenCalledTimes(1);
    });
});