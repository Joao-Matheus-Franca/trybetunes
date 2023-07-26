import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

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
        <div>
          <h2>Pesquisar</h2>
          <form>
            <input
              type="text"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
          {hasSearch
          && (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                { lastSearch }
              </p>
              <ul>
                {albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p>
                  : albuns.map((album) => (
                    <Link
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
            </div>)}
        </div>)
    );
  }
}

export default Search;
