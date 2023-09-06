import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState(''); 
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault(); // Передбачення стандатрної поведінки форми
    setSearchName(inputValue.trim()); // Отримуємо введений пошуковий запит і видаляємо пробіли
    onSubmit(searchName); // Передаємо введинений пошуковий запит батьківському компоненту
    event.target.reset(); // Скидаємо значення в полі вводу після відправки форми
  };

    return (
      <header>
        <SearchForm onSubmit={handleSubmit}>
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
          </a>
          <SearchButton>
            <SearchSpan>Search</SearchSpan>
          </SearchButton>
          <SearchInput
            name="searchName"
            type="text"
            id="search"
            value={inputValue}
            onChange={handleChange}
          />
        </SearchForm>
      </header>
    );
  }

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;