import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const namespace = 'search';

const Search = ({ fetchBooks, searchText }) => {
    const [inputValue, setInputValue] = useState('');
    const [isValidInput, setIsValidInput] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (searchText !== null) {
            setInputValue(searchText);
        }
        return () => {
            setIsValidInput(true);
        }
    }, [searchText])

    const onInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        
        const value = inputValue.trim();
        if (value !== '' && value.length > 3) {
            const queryString = value.replace(/ /g,'+');
            setIsValidInput(true);
            fetchBooks(value);
            navigate(`/books?q=${queryString}`);
        } else {
            setIsValidInput(false);
        }
    };

    return (
        <form className={namespace}>
            <div className={`${namespace}__container input-group`}>
                <input type="text" className={classNames(`${namespace}__input`, 'form-control', {'is-invalid': !isValidInput})} placeholder="Buscar libro" aria-label="" value={inputValue} onChange={onInputChange} />
                <button type="submit" className={`${namespace}__button btn`} onClick={handleOnSubmit}>
                    <span>BUSCAR</span>
                </button>
                {!isValidInput && <div className="invalid-feedback">Ingrese más de 3 caracteres</div>}
            </div>
        </form>
    );
};

Search.propTypes = {
    searchText: PropTypes.string,
    fetchBooks: PropTypes.func.isRequired,
};

Search.defaultProps = {
    searchText: '',
};

export default Search;