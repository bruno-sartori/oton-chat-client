import React from 'react';
import Linkify from 'react-linkify';
import styles from './index.less';

const TextMessage = ({ data = {} }) => (
  <div className={styles['sc-message--text']}>
    <Linkify properties={{ target: '_blank' }}>{data.text}</Linkify>
  </div>
);

export default TextMessage;
