import React from 'react';
import closeIcon from '@/assets/close-icon.png';

const Header = ({ imageUrl, teamName, onClose }) => {
  return (
    <div className="sc-header">
      <img className="sc-header--img" src={imageUrl} alt="" />
      <div className="sc-header--team-name"> {teamName} </div>
      <div className="sc-header--close-button" onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </div>
    </div>
  );
};

export default Header;
