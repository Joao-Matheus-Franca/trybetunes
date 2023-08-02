import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/profile.css';

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
      <div id="main-profile">
        <h2 id="title-profile">Perfil</h2>
        <ul id="profile-data-list">
          <li id="profile-name">{name}</li>
          <img
            id="profile-image"
            alt={ name }
            src={ image || 'https://www.svgrepo.com/show/436841/person-crop-square-fill.svg' }
          />
          <li>{email}</li>
          <li>{description}</li>
          <Link id="edit-profile-button" to="/profile/edit">Editar perfil</Link>
        </ul>
      </div>);
    return (
      <div data-testid="page-profile">
        {loading ? <Loading /> : (profile)}
      </div>
    );
  }
}

export default Profile;
