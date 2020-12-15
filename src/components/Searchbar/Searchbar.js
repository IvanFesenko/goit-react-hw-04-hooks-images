import { useState } from 'react';

import s from './Searchbar.module.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

export default SearchBar;
