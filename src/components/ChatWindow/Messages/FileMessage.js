import React from 'react';
import FileIcon from '../Icon/FileIcon';
import styles from './index.less';

const FileMessage = props => {
  const { data = {} } = props;

  return (
    <a className={styles['sc-message--file']} href={data.url} download={data.fileName}>
      <FileIcon />
      <p>{data.fileName}</p>
    </a>
  );
};

export default FileMessage;
