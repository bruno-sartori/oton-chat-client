import React from 'react';
import Linkify from 'react-linkify';

const TextMessage = ({ data = {} }) => (
  <div className="sc-message--text">
    <Linkify properties={{ target: '_blank' }}>{data.text}</Linkify>
  </div>
);

export default TextMessage;
