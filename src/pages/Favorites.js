import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: false,
    checked: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const musics = await getFavoriteSongs();
    this.setState({ loading: false, favorites: musics });
  }

  render() {
    const { favorites, loading, checked } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Favorites</h1>
        {loading ? <Loading /> : favorites.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            checked={ checked }
          />))}

      </div>
    );
  }
}

export default Favorites;
