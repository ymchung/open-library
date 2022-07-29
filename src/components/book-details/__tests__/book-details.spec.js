import { render } from '@testing-library/react';
import BookDetails from '../BookDetails';

describe('BookDetails Component', () => {
    const props = {
        book: {
            title: 'Harry Potter',
            firstPublishYear: 1999,
            authorName: 'J. K. Rowling',
            imageUrl: 'https:domain.org/image-size.png',
            authorKey: 'A123B',
            description: 'Harry Potter #3 For Harry Potter, it’s the start of another far-from-ordinary year at Hogwarts when the Knight Bus crashes through the darkness and comes to an abrupt halt in front of him.',
            authorBio: 'Joanne "Jo" Murray, OBE (née Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series',
        },
        isLoading: true,
        fetchSelectedBook: jest.fn(),
    }

    test('Component should render correctly', () => {
        const { container } = render(<BookDetails {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});