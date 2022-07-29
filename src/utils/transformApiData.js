const getAuthorName = authorName => {
    if (Array.isArray(authorName) && authorName.length) {
        return authorName.join(', ');
    }
    return authorName;
}

const getAuthorKey = authorKey => {
    const regex = new RegExp('.*works/');
    if (Array.isArray(authorKey)) {
        return authorKey[0].replace(regex, '');
    }
    
    return authorKey.replace(regex, '');
} 

const getImageUrl = coverId => `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

const transformBooks = data => ({
    docs: data.docs.map(d => ({
        key: getAuthorKey(d.key),
        title: d.title,
        authorName: getAuthorName(d.author_name),
        firstPublishYear: d.first_publish_year,
    })),
    booksNumFound: data.numFound,
});

const transformBookDetails = (res1, res2) => ({
    title: res1.title,
    firstPublishYear: res1.first_publish_year,
    authorName: getAuthorName(res1.author_name),
    imageUrl: res1.cover_i ? getImageUrl(res1.cover_i) : null,
    authorKey: getAuthorKey(res1.author_key),
    description: typeof res2.description === 'object' ? res2.description.value : res2.description,
});

export { transformBookDetails, transformBooks };