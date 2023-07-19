import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
  }

  handleChange = async ({ target: { id } }) => {
    const { favorites } = this.state;
    const song = favorites.find((s) => s.trackId.toString() === id);
    this.setState({ loading: true });
    await removeSong(song);
    const musics = await getFavoriteSongs();
    this.setState({ loading: false, favorites: musics });
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Favorites</h1>
        {loading ? <Loading /> : favorites.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            onChange={ this.handleChange }
            checked={ favorites.some((song) => song.trackId === music.trackId) }
          />))}

      </div>
    );
  }
}

export default Favorites;
