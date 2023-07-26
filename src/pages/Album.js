import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    musics: [],
    loading: false,
    favorites: [],
    getFavorites: [],
  };

  async componentDidMount() {
    const albumInfos = await this.getSongs();
    const artistInfos = await albumInfos[0];
    const musicsInfos = await albumInfos.filter((_m, i) => i > 0);

    this.setState({
      artist: artistInfos.artistName,
      album: artistInfos.collectionName,
      musics: musicsInfos });

    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, getFavorites: favorites });
  }

  getId = () => {
    const { match: { params: { id } } } = this.props;
    const value = id;
    return value;
  };

  getSongs = async () => {
    const data = await getMusics(this.getId());
    return data;
  };

  handleChange = async ({ target: { id, checked } }) => {
    this.setState({ loading: true });
    const music = await getMusics(id);
    if (!checked) {
      await removeSong(...music);
      this.setState((prev) => ({
        loading: false,
        favorites: prev.favorites.filter((f) => f !== id),
        getFavorites: prev.getFavorites.filter((f) => f.trackId.toString() !== id) }));
    } else {
      await addSong(...music);
      this.setState((prev) => ({ favorites: [...prev.favorites, id], loading: false }));
    }
  };

  render() {
    const { artist, album, musics, loading, favorites, getFavorites } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div>
            <h2>{album}</h2>
            <h3>{artist}</h3>
            {musics.map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ this.handleChange }
                checked={ (getFavorites.length)
                  ? (getFavorites.some((e) => e.trackId === music.trackId)
                  || favorites.includes(music.trackId.toString()))
                  : favorites.includes(music.trackId.toString()) }
              />))}
          </div>)}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;

export default Album;
