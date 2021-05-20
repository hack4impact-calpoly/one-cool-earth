import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';

class UserModal extends React.Component {

    render () {
        return (
            <>
              <Modal centered show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                  <Modal.Title>Volunteer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            First Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.userData.firstName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Last Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.userData.lastName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Email
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.userData.email} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Phone
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.props.userData.phone} />
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.props.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  
    
  }
  
export default UserModal;