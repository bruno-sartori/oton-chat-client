import React from 'react';
import FileIcon from '../FileIcon';

const FileMessage = (props) => {
  const { data = {} } = props;

  return (
    <a className="sc-message--file" href={data.url} download={data.fileName}>
      <FileIcon />
      <p>{data.fileName}</p>
    </a>
  );
};

export default FileMessage;
