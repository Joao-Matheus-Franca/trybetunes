import React from 'react';
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
    this.setState({ user: `Olá, ${name.name}`, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component">
            <h1>TybeTune</h1>
            <p data-testid="header-user-name">{ user }</p>
          </header>)
    );
  }
}

export default Header;
