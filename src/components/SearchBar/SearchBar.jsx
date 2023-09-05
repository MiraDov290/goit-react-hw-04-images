import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    searchName: '', // Зберігаємо значення вводу пошуку запита
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); // Передбачення стандатрної поведінки форми
    const searchQuery = event.target.elements.searchName.value.trim(); // Отримуємо введений пошуковий запит і видаляємо пробіли
    this.props.onSubmit(searchQuery); // Передаємо введинений пошуковий запит батьківському компоненту
    event.target.reset(); // Скидаємо значення в полі вводу після відправки форми
  };

  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
          </a>
          <SearchButton>
            <SearchSpan>Search</SearchSpan>
          </SearchButton>
          <SearchInput
            name="searchName"
            type="text"
            id="search"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;