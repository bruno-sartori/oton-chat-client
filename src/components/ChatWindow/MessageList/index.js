import React, { Component } from 'react';
import Message from '../Messages';
import styles from '../ChatWindow/index.less'; // TODO: extrair css para pasta MessageList

class MessageList extends Component {
  componentDidUpdate() {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    const { messageList = [], fullscreen = false } = this.props;

    return (
      <div
        className={`${styles['sc-message-list']} ${fullscreen &&
          styles['sc-message-list--fullscreen']}`}
        ref={el => {
          this.scrollList = el;
        }}
      >
        {messageList.map((message, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Message message={message} key={i} fullscreen={fullscreen} />
        ))}
      </div>
    );
  }
}

export default MessageList;
