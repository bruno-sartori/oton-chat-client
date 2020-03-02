import React, { Component } from 'react';
import './index.less';

class PopupWindow extends Component {
  componentDidMount() {
    this.scLauncher = document.querySelector('#sc-launcher');
    this.scLauncher.addEventListener('click', this.interceptLauncherClick);
  }

  componentWillUnmount() {
    if (this.scLauncher !== null) {
      this.scLauncher.removeEventListener('click', this.interceptLauncherClick);
    }
  }

  interceptLauncherClick = e => {
    const { isOpen, onClickedOutside } = this.props;
    const clickedOutside = !this.emojiPopup.contains(e.target) && isOpen;

    if (clickedOutside) {
      onClickedOutside(e);
    }
  };

  render() {
    const { isOpen, children, onInputChange } = this.props;

    return (
      <div
        className="sc-popup-window"
        ref={e => {
          this.emojiPopup = e;
        }}
      >
        <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
          <input
            onChange={onInputChange}
            className="sc-popup-window--search"
            placeholder="Search emoji..."
          />
          {children}
        </div>
      </div>
    );
  }
}

export default PopupWindow;
