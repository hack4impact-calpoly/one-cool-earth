import React from 'react'
import { Modal, Button } from 'react-bootstrap'

class LandingPageModal extends React.Component {

    render() {
        return(
            <Modal centered show={this.props.showModal} onHide={this.props.handleClose}>
                <Modal.Header>
                    <Modal.Title className='d-flex justify-content-center'>Login Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}} className='d-flex justify-content-center'>
                    Please make sure that you entered your login
                    information correctly.
                    <br /><br />
                    You may sign up below if you have not already.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.handleTryAgain}>
                        Try Again
                    </Button>
                    <Button variant="primary" onClick={this.props.handleSignUp}>
                        Sign-up
                    </Button>
                    <Button variant="primary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LandingPageModal
