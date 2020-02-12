import PropTypes from 'prop-types';
import React, { Component } from 'react';
import launcherIcon from '@/assets/logo-no-bg.svg';
import incomingMessageSound from '@/assets/sounds/notification.mp3';
import launcherIconActive from '@/assets/close-icon.png';
import ChatWindow from './ChatWindow';

class Launcher extends Component {
  state = {
    isOpen: false
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { mute, messageList } = this.props;

    if (mute) {
      return;
    }

    const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    const isNew = nextProps.messageList.length > messageList.length;

    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  }

  playIncomingMessageSound = () => {
    const audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick = () => {
    const { handleClick } = this.props;

    if (typeof handleClick !== 'undefined') {
      handleClick();
    } else {
      this.setState(state => ({
        isOpen: !state.isOpen,
      }));
    }
  }

  render() {
    const { isOpen: propsIsOpen, newMessagesCount, messageList, onFilesSelected, onMessageWasSent, agentProfile, showEmoji } = this.props;
    const { isOpen: stateIsOpen } = this.state;

    const isOpen = typeof propsIsOpen !== 'undefined' ? propsIsOpen : stateIsOpen;

    const classList = ['sc-launcher', (isOpen ? 'opened' : '')];

    const MessageCount = (props) => {
      if (props.count === 0 || props.isOpen === true) {
        return null;
      }

      return (
        <div className="sc-new-messages-count">
          {props.count}
        </div>
      );
    };

    return (
      <div id="sc-launcher">
        <div className={classList.join(' ')} onClick={this.handleClick}>
          <MessageCount count={newMessagesCount} isOpen={isOpen} />
          <img alt="open-icon" className="sc-open-icon" src={launcherIconActive} />
          <img alt="closed-icon" className="sc-closed-icon" src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={messageList}
          onUserInputSubmit={onMessageWasSent}
          onFilesSelected={onFilesSelected}
          agentProfile={agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick}
          showEmoji={showEmoji}
        />
      </div>
    );
  }
}

Launcher.propTypes = {
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
  onMessageWasSent: () => {},
  isOpen: false,
  handleClick: () => {},
  messageList: [],
  mute: false,
};

export default Launcher;
