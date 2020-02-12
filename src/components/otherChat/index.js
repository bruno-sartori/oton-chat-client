import React, { Component } from "react";
import $ from 'jquery';
import './index.css';

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

  render() {
    const { shownToggle, data, currentRec, openedBoxes = [] } = this.state;
    const hidden = {
      display: shownToggle ? 'block' : 'none'
    }

    return (
      <div>
        <ul style={{ float: "right" }}>
          {data.map((person, i) => (
            <div className="chat-sidebar" key={person.id}>
              <button type="button" onClick={() => this.showBox(i, person.id, person.name)}>Chat with {person.name}</button>
            </div>
          ))}
        </ul>

        {openedBoxes.map((o, i) => (
          <div className="msg_box" style={{ right: 270 * (i + 1) }}>
            <div onClick={this.toggle.bind(this)} className="msg_head">
              <b style={{ color: 'orange' }}>
                {typeof currentRec !== 'undefined' &&
                  <div className="modal-body">
                    {data[i].name}
                    ({data[i].id})
                  </div>
                }
              </b>
              Minimize
              <div className="close" ref={(element) => { this.dropdownBox = element; }} style={{ color: 'white' }}>Close</div>
            </div>
            <div style={hidden} className="msg_wrap"><div className="msg_body">Message will appear here</div></div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageBox;
