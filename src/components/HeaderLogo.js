import React from 'react';
import { Link } from 'react-router-dom';
import OpenLibraryLogo from '../assets/openlibrary-logo.svg';

const HeaderLogo = () => (
    <Link to="/">
        <img src={OpenLibraryLogo} height={40} alt="Open Library Logo" />
    </Link>
);

export default HeaderLogo;