import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from '../MessageList';
import UserInput from '../UserInput';
import Header from '../Header';
import styles from './index.less';

class ChatWindow extends Component {
  onUserInputSubmit = message => {
    const { onUserInputSubmit } = this.props;
    onUserInputSubmit(message);
  };

  onFilesSelected = filesList => {
    const { onFilesSelected } = this.props;
    onFilesSelected(filesList);
  };

  render() {
    const { messageList = [], isOpen, agentProfile = {}, onClose, showEmoji } = this.props;
    const classList = [styles['sc-chat-window'], isOpen ? styles.opened : styles.closed];

    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={agentProfile.teamName}
          imageUrl={agentProfile.imageUrl}
          onClose={onClose}
        />
        <MessageList messages={messageList} imageUrl={agentProfile.imageUrl} />
        <UserInput
          onSubmit={this.onUserInputSubmit}
          onFilesSelected={this.onFilesSelected}
          showEmoji={showEmoji}
        />
      </div>
    );
  }
}

ChatWindow.defaultProps = {
  onFilesSelected: () => {},
  showEmoji: false,
};

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default ChatWindow;
