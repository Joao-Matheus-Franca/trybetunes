import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    name: '',
    image: '',
    email: '',
    description: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    const { name, image, email, description } = user;
    this.setState({ name, image, email, description, loading: false });
  }

  render() {
    const { loading, name, image, email, description } = this.state;
    const profile = (
      <>
        <h2>Perfil</h2>
        <ul>
          <li>{name}</li>
          <img data-testid="profile-image" alt={ name } src={ image } />
          <li>{email}</li>
          <li>{description}</li>
        </ul>
        <Link to="/profile/edit">Editar perfil</Link>
      </>);
    return (
      <div data-testid="page-profile">
        {loading ? <Loading /> : (profile)}
      </div>
    );
  }
}

export default Profile;
