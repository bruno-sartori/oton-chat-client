import React from 'react';
import { Icon } from 'antd';
import styles from './FloatingButton.less';

const FloatingButton = ({ onClick }) => (
  <div className={styles['floating-button']} onClick={onClick}>
    <Icon className={styles['floating-button__icon']} type="message" />
  </div>
);

export default FloatingButton;
