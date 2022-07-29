import { render, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
    const props = {
        currentPage: 1,
        total: 20,
        pageLimit: 5,
        onPageChange: jest.fn(),
    }

    test('Component should render correctly', () => {
        const { container } = render(<Pagination {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('On search should call fetchBooks function', () => {
        const { getByTestId } = render(<Pagination {...props} />);
        fireEvent.click(getByTestId('paginator__link-2'));

        expect(props.onPageChange).toHaveBeenCalledTimes(1);
    });
});