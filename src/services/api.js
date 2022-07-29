import { transformBookDetails } from '../utils/transformApiData';

const baseUrl = 'https://openlibrary.org';

class Service {
    static getBooks(value, page = 1) {
        const queryString = value.trim().replace(/ /g,'+');
        return fetch(`${baseUrl}/search.json?q=${queryString}&page=${page}`)
            .then(response => response.json());
    }

    static getBookDetails(bookKey) {
        return Promise.all([
            fetch(`${baseUrl}/search.json?q=${bookKey}`).then(res => res.json()).then(r => r.docs && r.docs[0]),
            fetch(`${baseUrl}/works/${bookKey}.json`).then(res => res.json())
        ])
            .then(([resSearch, resWork]) => transformBookDetails(resSearch, resWork)
        );
    }

    static getAuthorData(authorKey) {
        return fetch(`${baseUrl}/authors/${authorKey}.json`)
            .then(response => response.json())
    }
}

export default Service;
