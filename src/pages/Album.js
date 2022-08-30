import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    musics: [],
  };

  async componentDidMount() {
    const info = await this.getSongs();
    const infos = await info[0];
    const musics = await info.filter((_e, i) => i > 0);
    this.setState({
      artist: infos.artistName,
      album: infos.collectionName,
      musics });
    console.log(musics);
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

  render() {
    const { artist, album, musics } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          <h2 data-testid="album-name">{album}</h2>
          <h3 data-testid="artist-name">{artist}</h3>
        </div>
        {musics.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />))}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;

export default Album;
