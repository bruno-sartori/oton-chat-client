import React, { Component } from "react";
import $ from 'jquery';
import './index.css';
import ChatWindow from "../ChatWindow/ChatWindow";

class MessageBox extends Component {
  state = {
    showBox: false,
    shownToggle: true,
    openedBoxes: [],
    data: [
      { id: "0", name: "Tony" },
      { id: "1", name: "Mark" },
      { id: "2", name: "Joy" }
    ],
    currentRec: undefined,
  };

  showBox = (i, pid, name) => {
    this.setState({ currentRec: i });
    console.log(`Selected record index: ${i} ${pid} ${name}`);

    this.setState({ showBox: true }, () => {
      document.addEventListener('click', this.closeBox);
    });

    this.setState(state => ({
      isOpen: true,
      openedBoxes: [...state.openedBoxes, { id: pid }]
    }));
    // this.alignBoxes(pid);
  }

  alignBoxes = (pid) => {
    const { data } = this.state;

    const dataSet = [...data];

    if ($.inArray(pid, dataSet) !== -1) {
      dataSet.splice($.inArray(pid, data), 1);
    }

    dataSet.unshift(pid);

    let s = 270; // start position
    const j = 260;  // next position

    $.each(dataSet, (index, value) => {
      if (index < 4) {
        $(`[rel="${value}"]`).css("right", s);
        $(`[rel="${value}"]`).show();
        s += j;
      }
      else {
        $(`[rel="${value}"]`).hide();
      }
    });
  }

  closeBox = (event) => {
    if (this.dropdownBox.contains(event.target)) {
      this.setState({ showBox: false }, () => {
        document.removeEventListener('click', this.closeBox);
      });
    }
  }

  toggle = () => {
    this.setState(state => ({
      shownToggle: !state.shownToggle
    }));
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
    const { messageList, onFilesSelected, onMessageWasSent, agentProfile, showEmoji } = this.props;


    const { isOpen: propsIsOpen, shownToggle, data, currentRec, openedBoxes = [] } = this.state;
    const hidden = {
      display: shownToggle ? 'block' : 'none'
    }

    const { isOpen: stateIsOpen } = this.state;

    const isOpen = typeof propsIsOpen !== 'undefined' ? propsIsOpen : stateIsOpen;


    return (
      <div id="sc-launcher">
        <ul style={{ float: "right" }}>
          {data.map((person, i) => (
            <div className="chat-sidebar" key={person.id}>
              <button type="button" onClick={() => this.showBox(i, person.id, person.name)}>Chat with {person.name}</button>
            </div>
          ))}
        </ul>

        {openedBoxes.map((o, i) => (
          <div className="msg_box" style={{ right: i === 0 ? 0 : 270 * (i + 1) }}>
            <ChatWindow
              messageList={messageList}
              onUserInputSubmit={onMessageWasSent}
              onFilesSelected={onFilesSelected}
              agentProfile={agentProfile}
              isOpen={true}
              onClose={this.handleClick}
              showEmoji={showEmoji}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MessageBox;
