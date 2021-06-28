import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

class UserModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  handleEditButton() {
    this.setState({
      edit: true
    })
  }

  handleCancelEdit() {
    this.setState({
      edit: false
    })
  }

  handleClose() {
    if(this.state.edit === true) {
      this.setState({
        edit: false
      })
    }
    this.props.handleClose()
  }

    render () {
        return (
            <>
              <Modal centered show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                  <Modal.Title>Volunteer Details</Modal.Title>
                  <FaEdit onClick={() => this.handleEditButton()}/>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            First Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.userData.firstName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Last Name
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.userData.lastName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Email
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.userData.email} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Phone
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.userData.phone} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                            Admin
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={this.state.edit ? false : true} readOnly={this.state.edit ? false : true} defaultValue={this.props.userData.admin === true ? "Yes" : "No"} />
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                {this.state.edit ?
                    <Button onClick={() => this.handleClose()}>
                      Save Changes
                    </Button> 
                  : null}
                  {this.state.edit ?
                    <Button onClick={() => this.handleCancelEdit()}>
                      Cancel
                    </Button> 
                  : null}
                  {!this.state.edit ?
                    <Button onClick={() => this.handleClose()}>
                    Close
                  </Button>
                  : null}
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  
    
  }
  
export default UserModal;
