import React from 'react';

const EmojiMessage = (props) => {
  const { data = {} } = props;

  return <div className="sc-message--emoji">{data.emoji}</div>;
};

export default EmojiMessage;
