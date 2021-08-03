import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';

class UserModal extends React.Component {

    handleClose = () => {
        this.props.handleClose()
    }

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
                            <Form.Control plaintext={true} readOnly={true} defaultValue={this.props.userData.name ? this.props.userData.name.first : "..."} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Last Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={true} readOnly={true} defaultValue={this.props.userData.name ? this.props.userData.name.last : "..."} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Email
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={true} readOnly={true} defaultValue={this.props.userData.email} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Phone
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={true} readOnly={true} defaultValue={this.props.userData.phoneNumber} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Admin
                            </Form.Label>
                            <Col sm="8">
                            <p>{this.props.userData.admin ? "Yes" : "No"}</p>
                            </Col>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{"marginRight": "190px"}} onClick={this.props.handleAdminChange}>
                    {this.props.userData.admin ? "Remove Admin" : "Make Admin"}
                  </Button>
                  <Button onClick={() => this.handleClose()}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }


  }

export default UserModal;
