import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, onChange, checked } = this.props;
    return (
      <div className="music-box">
        <p>{ trackName }</p>
        <audio src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            className="favorite-checkbox"
            id={ trackId }
            type="checkbox"
            onChange={ onChange }
            checked={ checked }
          />
          {
            checked ? (<img
              className="heart-icon"
              src="https://www.svgrepo.com/show/525369/heart.svg"
              alt="Ícone coração cheio"
            />) : (<img
              className="heart-icon"
              src="https://www.svgrepo.com/show/532473/heart.svg"
              alt="Ícone coração vazio"
            />)
          }
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
