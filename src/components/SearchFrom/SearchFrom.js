import { useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { SearchFormButton, SearchForm1, SearchFormInput, SearchFormLabel } from './SearchFrom.style';

const SearchFrom = ({ onSearch }) => {
 const [query, setQuery] = useState('');

  const handleSearchInput = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

     // Запрещает отправку пустого инпута
      if (!query.trim()) return;

    // Отдать данные внешнему компоненту
    onSearch(query);

    resetForm();
  };
  // Сбрасывает поле после отправки
  const resetForm = () => setQuery('');

  return (
      <SearchForm1 onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="query"
          value={query}
          onChange={handleSearchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm1>
    );
  }

SearchFrom.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchFrom;