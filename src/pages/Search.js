import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
    loading: false,
    hasSearch: false,
    lastSearch: '',
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

  handleClick = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const albuns = await searchAlbumsAPI(search);
    this.setState((prev) => ({
      loading: false,
      search: '',
      hasSearch: true,
      lastSearch: prev.search,
      albuns,
    }));
  };

  render() {
    const { isDisabled, loading, search, hasSearch, lastSearch, albuns } = this.state;
    return (loading ? <Loading />
      : (
        <div data-testid="page-search">
          <h1>Search</h1>
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
          {hasSearch
          && (
            <>
              <p>
                Resultado de álbuns de:
                {' '}
                { lastSearch }
              </p>
              <ul>
                {albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p>
                  : albuns.map((album) => (
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                      key={ album.collectionId }
                    >
                      <img
                        alt={ album.collectionName }
                        src={ album.artworkUrl100 }
                      />
                      <li>{album.collectionName}</li>
                      <li>{album.artistName}</li>
                    </Link>))}
              </ul>
            </>)}
        </div>)
    );
  }
}

export default Search;
