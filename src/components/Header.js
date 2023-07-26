import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: '',
    isLoading: true,
  };

  async componentDidMount() {
    const userData = await getUser();
    this.setState({ user: userData.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <header>
            <h1>TybeTunes</h1>
            <nav>
              <Link to="/search">Pesquisar</Link>
              <Link to="/favorites">Favoritos</Link>
              <Link to="/profile">Perfil</Link>
            </nav>
            <p>{ user }</p>
          </header>)
    );
  }
}

export default Header;
