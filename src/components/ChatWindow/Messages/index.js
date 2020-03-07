import React, { Component } from 'react';
import chatIconUrl from '@/assets/chat-icon.svg';
import logger from '@/utils/logger';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import styles from './index.less';

class Message extends Component {
  renderMessageOfType = type => {
    const { message } = this.props;

    switch (type) {
      case 'text':
        return <TextMessage {...message} />;
      case 'emoji':
        return <EmojiMessage {...message} />;
      case 'file':
        return <FileMessage {...message} />;
      default:
        logger.error(`Attempting to load message with unsupported file type '${type}'`);
        return null;
    }
  };

  render() {
    const { message = {} } = this.props;
    const contentClassList = [
      styles['sc-message--content'],
      message.author === 'me' ? styles.sent : styles.received,
    ];

    return (
      <div className={styles['sc-message']}>
        <div className={contentClassList.join(' ')}>
          <div
            className={styles['sc-message--avatar']}
            style={{ backgroundImage: `url(${chatIconUrl})` }}
          />
          {this.renderMessageOfType(message.type)}
        </div>
      </div>
    );
  }
}

export default Message;
