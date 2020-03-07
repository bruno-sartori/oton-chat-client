import React from 'react';
import closeIcon from '../../../assets/close-icon.png';
import styles from './index.less';

const Header = ({ imageUrl, teamName, onClose }) => {
  return (
    <div className={styles['sc-header']}>
      <img className={styles['sc-header--img']} src={imageUrl} alt="" />
      <div className={styles['sc-header--team-name']}> {teamName} </div>
      <div className={styles['sc-header--close-button']} onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </div>
    </div>
  );
};

export default Header;
