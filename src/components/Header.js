import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    user: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({ user: name.name, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component">
            <h1>TybeTunes</h1>
            <nav>
              <Link data-testid="link-to-search" to="/search">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </nav>
            <p data-testid="header-user-name">{ user }</p>
          </header>)
    );
  }
}

export default Header;
