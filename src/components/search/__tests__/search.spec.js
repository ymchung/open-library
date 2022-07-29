import { render, fireEvent } from '@testing-library/react';
import Search from '../Search';

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
  }));

describe('Search Component', () => {
    const props = {
        searchText: 'abcd',
        fetchBooks: jest.fn(),
    }

    test('Component should render correctly', () => {
        const { container } = render(<Search {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('On search should call fetchBooks function', () => {
        const { getByTestId } = render(<Search {...props} />);
        fireEvent.click(getByTestId('search__button'));

        expect(props.fetchBooks).toHaveBeenCalledTimes(1);
    });
});