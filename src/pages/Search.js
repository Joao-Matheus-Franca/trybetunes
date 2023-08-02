import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../style/search.css';

class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
    loading: false,
    hasSearch: false,
    lastSearch: '',
  };

  validateSearch = () => {
    const { search } = this.state;
    const minSearchSize = 2;
    if (search.length >= minSearchSize) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ search: value }, () => this.validateSearch());
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
        <div id="main-search">
          <div id="header-search">
            <h2 id="title-search">Pesquisar</h2>
            <form id="form-search">
              <input
                id="input-form-search"
                type="text"
                value={ search }
                onChange={ this.handleChange }
              />
              <button
                id="button-form-search"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                <img
                  id="image-button-form-search"
                  src="https://www.svgrepo.com/show/532552/search-alt-2.svg"
                  alt="Ícone de busca"
                />
              </button>
            </form>
          </div>
          {hasSearch
          && (
            <div id="result-search">
              <p id="result-phrase">
                Resultado de álbuns de:
                {' '}
                { lastSearch }
              </p>
              <ul id="result-list">
                {albuns.length === 0 ? (
                  <p id="not-result-phrase">Nenhum álbum foi encontrado</p>)
                  : albuns.map((album) => (
                    <Link
                      className="album-result"
                      to={ `/album/${album.collectionId}` }
                      key={ album.collectionId }
                    >
                      <img
                        id="image-album-result"
                        alt={ album.collectionName }
                        src={ album.artworkUrl100 }
                      />
                      <li>{album.collectionName}</li>
                      <li>{album.artistName}</li>
                    </Link>))}
              </ul>
            </div>)}
        </div>)
    );
  }
}

export default Search;
