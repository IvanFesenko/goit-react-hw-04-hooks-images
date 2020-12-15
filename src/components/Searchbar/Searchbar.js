import React, { Component } from 'react';

import s from './Searchbar.module.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSearch } = this.props;
    onSearch(query);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
