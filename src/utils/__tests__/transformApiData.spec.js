import { transformBooks, transformBookDetails }from '../transformApiData';

describe('transformApiData', () => {
    test('transformBooks()', () => {
        const data = {
            docs: [{
                key: '/works/A123B',
                title: 'title',
                author_name: ['author1', 'author2'],
                first_publish_year: 2000,
             }],
            numFound: 1,
        };
        const data2 = transformBooks(data);
        expect(data2).toEqual({
            docs: [{
                key: 'A123B',
                title: 'title',
                authorName: 'author1, author2',
                firstPublishYear: 2000,
            }],
            booksNumFound: 1,
        });
    });

    test('transformBookDetails(a, b) with cover_i and description as array', () => {
        const res1 = {
            title: 'title',
            first_publish_year: 1999,
            author_name: ['author'],
            cover_i: 123,
            author_key: 'works/A123B',
        };

        const res2 = {
            description: { value: 'description text'} ,
        };

        const data = transformBookDetails(res1, res2);
        expect(data).toEqual({
            title: 'title',
            firstPublishYear: 1999,
            authorName: 'author',
            imageUrl: 'https://covers.openlibrary.org/b/id/123-L.jpg',
            authorKey: 'A123B',
            description: 'description text',
        });
    });

    test('transformBookDetails(a, b) without cover_i and description as text', () => {
        const res1 = {
            title: 'title',
            first_publish_year: 1999,
            author_name: ['author'],
            author_key: 'works/A123B',
        };

        const res2 = {
            description: 'description text',
        };

        const data = transformBookDetails(res1, res2);
        expect(data).toEqual({
            title: 'title',
            firstPublishYear: 1999,
            authorName: 'author',
            imageUrl: null,
            authorKey: 'A123B',
            description: 'description text',
        });
    });
});
