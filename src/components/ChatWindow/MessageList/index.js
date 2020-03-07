import React, { Component } from 'react';
import Message from '../Messages';
import styles from '../ChatWindow/index.less'; // TODO: extrair css para pasta MessageList

class MessageList extends Component {
  componentDidUpdate() {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    const { messages = [] } = this.props;

    return (
      <div
        className={styles['sc-message-list']}
        ref={el => {
          this.scrollList = el;
        }}
      >
        {messages.map((message, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Message message={message} key={i} />
        ))}
      </div>
    );
  }
}

export default MessageList;
