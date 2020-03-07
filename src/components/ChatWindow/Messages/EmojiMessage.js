import React from 'react';
import styles from './index.less';

const EmojiMessage = props => {
  const { data = {} } = props;

  return <div className={styles['sc-message--emoji']}>{data.emoji}</div>;
};

export default EmojiMessage;
