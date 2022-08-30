import React from 'react';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
  };

  handleChange = (event) => {
    const { target: { value } } = event;
    this.setState({ search: value }, () => this.validateSearch());
  };

  validateSearch = () => {
    const { search } = this.state;
    const minLenght = 2;
    if (search.length >= minLenght) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
