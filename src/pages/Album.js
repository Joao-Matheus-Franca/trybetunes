import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
    const info = await this.getSongs();
    const infos = await info[0];
    const musics = await info.filter((_e, i) => i > 0);
    this.setState({
      artist: infos.artistName,
      album: infos.collectionName,
      musics });

    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    // const songs = favorites.map((song) => song);
    // console.log(favorites);
    this.setState({ loading: false, getFavorites: favorites });
  }

  getId = () => {
    const { match: { params: { id } } } = this.props;
    const ids = id;
    return ids;
  };

  getSongs = async () => {
    const data = await getMusics(this.getId());
    return data;
  };

  handleChange = async (event) => {
    const { target: { id } } = event;
    this.setState({ loading: true });
    const music = await getMusics(id);
    await addSong(music[0]);
    this.setState((prev) => ({ favorites: [...prev.favorites, id], loading: false }));
  };

  render() {
    const { artist, album, musics, loading, favorites, getFavorites } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-album">
            <h1>Album</h1>
            <h2 data-testid="album-name">{album}</h2>
            <h3 data-testid="artist-name">{artist}</h3>
            {musics.map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ this.handleChange }
                checked={ (getFavorites[0] !== undefined)
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
