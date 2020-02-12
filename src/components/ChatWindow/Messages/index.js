import React, { Component } from 'react';
import chatIconUrl from '@/assets/chat-icon.svg';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';

class Message extends Component {

  renderMessageOfType = type => {
    const { message } = this.props;

    switch(type) {
      case 'text':
        return <TextMessage {...message} />;
      case 'emoji':
        return <EmojiMessage {...message} />;
      case 'file':
        return <FileMessage {...message} />;
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`);
        return null;
    }
  }

  render () {
    const { message = {} } = this.props;
    const contentClassList = ['sc-message--content', (message.author === 'me' ? 'sent' : 'received')];

    return (
      <div className="sc-message">
        <div className={contentClassList.join(' ')}>
          <div className="sc-message--avatar" style={{ backgroundImage: `url(${chatIconUrl})` }} />
          {this.renderMessageOfType(message.type)}
        </div>
      </div>
    );
  }
}

export default Message;
