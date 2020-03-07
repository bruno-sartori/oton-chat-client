import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SendIcon from '../Icon/SendIcon';
import FileIcon from '../Icon/FileIcon';
import EmojiIcon from '../Icon/EmojiIcon';
import PopupWindow from '../PopupWindow';
import EmojiPicker from '../EmojiPicker';
import styles from './index.less';

class UserInput extends Component {
  state = {
    inputActive: false,
    inputHasText: false,
    emojiPickerIsOpen: false,
    emojiFilter: '',
  };

  componentDidMount() {
    this.emojiPickerButton = document.querySelector('#sc-emoji-picker-button');
  }

  handleKeyDown = event => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return this.submitText(event);
    }

    return null;
  };

  handleKeyUp = event => {
    const inputHasText = event.target.innerHTML.length !== 0 && event.target.innerText !== '\n';
    this.setState({ inputHasText });
  };

  showFilePicker = () => {
    this.fileUploadButton.click();
  };

  toggleEmojiPicker = e => {
    e.preventDefault();

    const { emojiPickerIsOpen } = this.state;

    if (!emojiPickerIsOpen) {
      this.setState({ emojiPickerIsOpen: true });
    }
  };

  closeEmojiPicker = e => {
    if (this.emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.setState({ emojiPickerIsOpen: false });
  };

  submitText = event => {
    event.preventDefault();

    const text = this.userInput.textContent;

    if (text && text.length > 0) {
      const { onSubmit } = this.props;

      onSubmit({
        author: 'me',
        type: 'text',
        data: { text },
      });

      this.userInput.innerHTML = '';
    }
  };

  onFilesSelected = event => {
    if (event.target.files && event.target.files.length > 0) {
      const { onFilesSelected } = this.props;
      onFilesSelected(event.target.files);
    }
  };

  handleEmojiPicked = emoji => {
    const { inputHasText } = this.state;

    this.setState({ emojiPickerIsOpen: false });

    if (inputHasText) {
      this.userInput.innerHTML += emoji;
    } else {
      const { onSubmit } = this.props;

      onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji },
      });
    }
  };

  handleEmojiFilterChange = event => {
    const emojiFilter = event.target.value;
    this.setState({ emojiFilter });
  };

  renderEmojiPopup = () => {
    const { emojiPickerIsOpen, emojiFilter } = this.state;

    return (
      <PopupWindow
        isOpen={emojiPickerIsOpen}
        onClickedOutside={this.closeEmojiPicker}
        onInputChange={this.handleEmojiFilterChange}
      >
        <EmojiPicker onEmojiPicked={this.handleEmojiPicked} filter={emojiFilter} />
      </PopupWindow>
    );
  };

  renderSendOrFileIcon = () => {
    const { inputHasText } = this.state;

    if (inputHasText) {
      return (
        <div className={styles['sc-user-input--button']}>
          <SendIcon onClick={this.submitText} />
        </div>
      );
    }

    return (
      <div className={styles['sc-user-input--button']}>
        <FileIcon onClick={this.showFilePicker} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={e => {
            this.fileUploadButton = e;
          }}
          onChange={this.onFilesSelected}
        />
      </div>
    );
  };

  render() {
    const { emojiPickerIsOpen, inputActive } = this.state;
    const { showEmoji, fullscreen = false } = this.props;

    return (
      <form
        className={`${styles['sc-user-input']} ${inputActive ? styles.active : ''} ${fullscreen &&
          styles['sc-user-input--fullscreen']}`}
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <div
          role="button"
          tabIndex="0"
          onFocus={() => {
            this.setState({ inputActive: true });
          }}
          onBlur={() => {
            this.setState({ inputActive: false });
          }}
          ref={e => {
            this.userInput = e;
          }}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          contentEditable="true"
          placeholder="Write a reply..."
          className={styles['sc-user-input--text']}
        />
        <div className={styles['sc-user-input--buttons']}>
          <div className={styles['sc-user-input--button']} />
          <div className={styles['sc-user-input--button']}>
            {showEmoji && (
              <EmojiIcon
                onClick={this.toggleEmojiPicker}
                isActive={emojiPickerIsOpen}
                tooltip={this.renderEmojiPopup()}
              />
            )}
          </div>
          {this.renderSendOrFileIcon()}
        </div>
      </form>
    );
  }
}

UserInput.defaultProps = {
  showEmoji: false,
};

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default UserInput;
