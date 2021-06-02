import React from 'react';
import {Button, Modal} from 'react-bootstrap';

class DateModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  render() {
    return (
      <>
	<Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header>
            <Modal.Title>Events on {this.props.dateData.dateStr}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This is the new modal body
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DateModal;
